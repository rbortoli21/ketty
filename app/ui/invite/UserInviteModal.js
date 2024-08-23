import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { useCurrentUser, th, grid } from '@coko/client'
import UserInviteForm from './UserInviteForm'
import UserList from './UserList'
// import UserStatus from './UserStatus'
import { Form } from '../common'
import {
  SEARCH_USERS,
  ADD_TEAM_MEMBERS,
  GET_BOOK_TEAMS,
  UPDATE_TEAM_MEMBER_STATUS,
  REMOVE_TEAM_MEMBER,
  SEND_INVITATIONS,
  GET_INVITATIONS,
  DELETE_INVITATION,
  UPDATE_INVITATION,
} from '../../graphql'

import { isAdmin, isOwner } from '../../helpers/permissions'

const Wrapper = styled.div``

const ScrollWrapper = styled.div`
  border: 1px solid ${th('colorBorder')};
  border-radius: ${th('colorBorder')};
  max-height: 400px;
  overflow: auto;
  padding: ${grid(1)} ${grid(2)};
`

const UserInviteModal = ({ bookId }) => {
  const { data: bookTeamsData, loading: loadingBookTeamsData } = useQuery(
    GET_BOOK_TEAMS,
    {
      variables: {
        objectId: bookId,
        objectType: 'book',
      },
    },
  )

  const { data: invitationsData, loading: loadingInvitationsData } = useQuery(
    GET_INVITATIONS,
    {
      variables: {
        bookId,
      },
    },
  )

  const bookTeams = bookTeamsData?.getObjectTeams?.result || []

  const bookInvites = invitationsData?.getInvitations || []

  const bookTeamsAndInvites = bookTeams.concat(bookInvites)

  const [searchForUsers] = useMutation(SEARCH_USERS)
  const [addTeamMembers] = useMutation(ADD_TEAM_MEMBERS)
  const [updateTeamMemberStatus] = useMutation(UPDATE_TEAM_MEMBER_STATUS)
  const [removeTeamMember] = useMutation(REMOVE_TEAM_MEMBER)

  const [sendInvitations] = useMutation(SEND_INVITATIONS, {
    refetchQueries: [{ query: GET_INVITATIONS, variables: { bookId } }],
  })

  const [updateInvitation] = useMutation(UPDATE_INVITATION)

  const [deleteInvitation] = useMutation(DELETE_INVITATION, {
    refetchQueries: [{ query: GET_INVITATIONS, variables: { bookId } }],
  })

  const { currentUser } = useCurrentUser()

  const [form] = Form.useForm()

  const fetchUserList = async searchQuery => {
    const variables = {
      search: searchQuery,
      exclude: [],
      exactMatch: true,
    }

    return searchForUsers({ variables }).then(res => {
      const { data } = res
      const { searchForUsers: searchForUsersData } = data

      if (!searchForUsersData.length) {
        const existingEmails = bookInvites
          .flatMap(team => team.members.map(member => member.user.email))
          .find(email => email.toLowerCase() === searchQuery.toLowerCase())

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!existingEmails && emailRegex.test(searchQuery))
          return [
            {
              displayName: `Invite "${searchQuery}" by email`,
              id: searchQuery,
            },
          ]
      }

      const existingUserIds = bookTeams.flatMap(team =>
        team.members.map(member => member.user.id),
      )

      // Exclude users that are already in the team
      const filteredExistingUsers = searchForUsersData.filter(
        user => !existingUserIds.includes(user.id),
      )

      return filteredExistingUsers
    })
  }

  const inviteUsers = async inviteData => {
    // This should be better handled using form validation on
    // "users" Form.Item in UserInviteForm but for some reason
    // using the rules prop there gives an error post validation.
    if (inviteData.users.length < 1) {
      return false
    }

    const collaboratorTeam = bookTeams.find(
      team => team.role === 'collaborator',
    )

    const variables = {
      teamId: collaboratorTeam.id,
      status: inviteData.access,
    }

    const emailInvites = inviteData.users.filter(user =>
      user.label.includes('Invite'),
    )

    if (emailInvites.length) {
      await sendInvitations({
        variables: {
          ...variables,
          bookId,
          members: emailInvites.map(user => user.value),
        },
      })
    }

    const existingInvites = inviteData.users.filter(
      user => !user.label.includes('Invite'),
    )

    return addTeamMembers({
      variables: {
        ...variables,
        bookId,
        members: existingInvites.map(user => user.value),
      },
      skip: !existingInvites.length,
    }).then(() => {
      form.resetFields()
    })
  }

  const handleUpdateTeamMemberStatus = (updateData, role) => {
    const { teamMemberId, value: status, email } = updateData

    if (role === 'invitations') {
      return updateInvitation({
        variables: {
          email,
          status,
          bookId,
        },
      })
    }

    return updateTeamMemberStatus({
      variables: {
        teamMemberId,
        status,
      },
    })
  }

  const handleRemoveTeamMember = (removeData, role) => {
    if (role === 'invitations') {
      return deleteInvitation({
        variables: {
          email: removeData.email,
          bookId,
        },
      })
    }

    return removeTeamMember({
      variables: removeData,
    })
  }

  const canChangeAccess = isAdmin(currentUser) || isOwner(bookId, currentUser)

  return (
    <Wrapper>
      <UserInviteForm
        canChangeAccess={canChangeAccess}
        fetchOptions={fetchUserList}
        form={form}
        onInvite={inviteUsers}
      />

      <ScrollWrapper>
        <UserList
          bookTeams={bookTeamsAndInvites}
          canChangeAccess={canChangeAccess}
          loading={loadingBookTeamsData || loadingInvitationsData}
          onChangeAccess={handleUpdateTeamMemberStatus}
          onRemoveAccess={handleRemoveTeamMember}
        />
      </ScrollWrapper>
    </Wrapper>
  )
}

UserInviteModal.propTypes = {
  bookId: PropTypes.string.isRequired,
  // onCancel: PropTypes.func.isRequired,
  // open: PropTypes.bool.isRequired,
  // title: PropTypes.string.isRequired,
}

export default UserInviteModal

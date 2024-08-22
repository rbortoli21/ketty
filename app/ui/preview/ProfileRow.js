import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { EditOutlined } from '@ant-design/icons'

import { grid, th } from '@coko/client'

import { Button, Input, Modal, Select } from '../common'

// #region styled
const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  gap: ${grid(2)};
`

const StyledSelect = styled(Select)`
  flex-grow: 1;
  max-width: calc(100% - 78px - ${grid(2)});

  .ant-select-selection-item {
    font-size: 18px;
    font-weight: bold;
  }
`

const StyledButton = styled(Button)`
  font-size: 20px;
  opacity: 1;
  padding: 0;
  transition: opacity 0.2s ease-in, visibility 0.2s ease-in;
  /* stylelint-disable-next-line declaration-no-important */
  width: ${grid(10)} !important;

  &:hover,
  &:active {
    /* stylelint-disable-next-line declaration-no-important */
    background-color: ${th('colorBackground')} !important;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}

  .anticon {
    /* stylelint-disable-next-line declaration-no-important */
    font-size: 20px !important;
  }
`
// #endregion styled

const ProfileRow = props => {
  const {
    canModifyProfiles,
    className,
    isCollapsed,
    isNewProfileSelected,
    onProfileChange,
    onProfileRename,
    profiles,
    selectedProfile,
  } = props

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameInput, setRenameInput] = useState(selectedProfile.label)
  const inputRef = useRef(null)

  useEffect(() => {
    setRenameInput(selectedProfile.label)
  }, [JSON.stringify(selectedProfile)])

  useEffect(() => {
    if (isModalOpen && inputRef && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      })
    }
  }, [isModalOpen])

  const handleSelectProfile = (_, option) => {
    setRenameInput(option.label)
    onProfileChange(option.value)
  }

  const handleRenameInputChange = value => {
    setRenameInput(value)
  }

  const handleRename = () => {
    const profileValue = selectedProfile.value
    const newName = renameInput
    setIsRenaming(true)

    onProfileRename(profileValue, newName)
      .then(() => {
        setIsModalOpen(false)
      })
      .finally(() => {
        setIsRenaming(false)
      })
  }

  const handleInputKeyDown = e => {
    if (e.key === 'Enter') handleRename()
  }

  const handleClickEdit = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Wrapper className={className}>
      {!isCollapsed && (
        <>
          <StyledSelect
            onChange={handleSelectProfile}
            optionLabelProp="label"
            options={profiles}
            size="large"
            value={selectedProfile.value}
          />

          <StyledButton
            disabled={!canModifyProfiles}
            hidden={isNewProfileSelected}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            type="text"
          />

          <Modal
            confirmLoading={isRenaming}
            onCancel={closeModal}
            onOk={handleRename}
            open={isModalOpen}
            title="Edit export name"
          >
            <Input
              onChange={handleRenameInputChange}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
              value={renameInput}
            />
          </Modal>
        </>
      )}
    </Wrapper>
  )
}

ProfileRow.propTypes = {
  canModifyProfiles: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedProfile: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  isNewProfileSelected: PropTypes.bool.isRequired,
  onProfileChange: PropTypes.func.isRequired,
  onProfileRename: PropTypes.func.isRequired,
}

ProfileRow.defaultProps = {}

export default ProfileRow

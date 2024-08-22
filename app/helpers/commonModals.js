import React from 'react'

import { Paragraph } from '../ui/common/Typography'
import Modal from '../ui/common/Modal'

const showUnauthorizedAccessModal = callback => {
  const unauthorizedAccessModal = Modal.warning()
  return unauthorizedAccessModal.update({
    title: 'Unauthorized action',
    content: (
      <Paragraph>
        {`You don't have permission to access this book. Select 'OK' to be redirected to your Dashboard.`}
      </Paragraph>
    ),
    onOk() {
      if (callback) {
        callback()
      }

      unauthorizedAccessModal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showChangeInPermissionsModal = () => {
  const changeInPermissionsModal = Modal.warning()
  return changeInPermissionsModal.update({
    title: 'Permissions change',
    content: (
      <Paragraph>
        A change of your permissions just ocurred. Your new permissions will be
        updated in the background
      </Paragraph>
    ),
    onOk() {
      changeInPermissionsModal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showUnauthorizedActionModal = (
  shouldRedirect = false,
  callback = undefined,
  key = undefined,
) => {
  const unauthorizedActionModal = Modal.warning()

  let errorMessage

  switch (key) {
    case 'lockedChapterDelete':
      errorMessage = `You can’t delete a chapter that is currently being edited by another book member with edit access.`
      break

    default:
      errorMessage = `You don't have permissions to perform this action. Please contact book's
      owner`
      break
  }

  return unauthorizedActionModal.update({
    title: 'Unauthorized action',
    content: <Paragraph>{errorMessage}</Paragraph>,
    onOk() {
      if (shouldRedirect) {
        callback()
      }

      unauthorizedActionModal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showGenericErrorModal = callback => {
  const genericErrorModal = Modal.error()
  return genericErrorModal.update({
    title: 'Error',
    content: (
      <Paragraph>
        {`Something went wrong.${
          callback ? ' You will be redirected back to your dashboard.' : ''
        }Please contact your admin.`}
      </Paragraph>
    ),
    onOk() {
      if (callback) {
        callback()
      }

      genericErrorModal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const onInfoModal = errorMessage => {
  const warningModal = Modal.warning()
  return warningModal.update({
    title: 'Warning',
    content: <Paragraph>{errorMessage}</Paragraph>,
    onOk() {
      warningModal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showOpenAiRateLimitModal = () => {
  const modal = Modal.warning()
  return modal.update({
    title: 'Rate Limit Exceeded',
    content: (
      <>
        <Paragraph>
          It looks like you’ve made too many requests in a short period. We have
          usage limits to ensure service reliability. Please wait for a few
          minutes before trying again.
        </Paragraph>
        <Paragraph>
          If you’re repeatedly getting this message, please contact your admin.
        </Paragraph>
      </>
    ),
    onOk() {
      modal.destroy()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showErrorModal = callback => {
  const warningModal = Modal.error()
  return warningModal.update({
    title: 'Error',
    content: (
      <Paragraph>
        There is something wrong with the book you have requested. You will be
        redirected back to your dashboard
      </Paragraph>
    ),
    onOk() {
      warningModal.destroy()
      callback()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

const showDeletedBookModal = callback => {
  const warningModal = Modal.error()
  return warningModal.update({
    title: 'Error',
    content: (
      <Paragraph>
        This book has been deleted by the Owner. Select &quot;OK&quot; to be
        redirected to your Dashboard
      </Paragraph>
    ),
    onOk() {
      warningModal.destroy()
      callback()
    },
    okButtonProps: { style: { backgroundColor: 'black' } },
    maskClosable: false,
    width: 570,
    bodyStyle: {
      marginRight: 38,
      textAlign: 'justify',
    },
  })
}

export {
  showUnauthorizedAccessModal,
  showGenericErrorModal,
  showUnauthorizedActionModal,
  showChangeInPermissionsModal,
  showOpenAiRateLimitModal,
  onInfoModal,
  showErrorModal,
  showDeletedBookModal,
}

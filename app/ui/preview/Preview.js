﻿import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Page } from '../common'

import PreviewDisplay from './PreviewDisplay'
import PreviewSettings from './PreviewSettings'

// #region styled
const Wrapper = styled.div`
  display: flex;
  height: 100%;

  > div {
    transition: width 0.3s;
  }

  > div:first-child {
    border-right: 2px solid gainsboro;
    flex-grow: 1;
  }

  > div:last-child {
    min-width: 50px;
    width: ${props => (props.$showSettings ? '500px' : '2%')};
  }
`
// #endregion styled

const Preview = props => {
  const {
    connectToLulu,
    createProfile,
    currentOptions,
    deleteProfile,
    defaultProfile,
    download,
    canModify,
    canUploadToProvider,
    isDownloadButtonDisabled,
    isUserConnectedToLulu,
    loadingExport,
    loadingPreview,
    luluConfig,
    onOptionsChange,
    onProfileChange,
    previewLink,
    profiles,
    renameProfile,
    selectedProfile,
    sendToLulu,
    templates,
    isbns,
    updateProfileOptions,
  } = props

  const [showSettings, setShowSettings] = useState(true)

  const handleClickCollapse = () => {
    setShowSettings(!showSettings)
  }

  const handleOptionsChange = newOptions => {
    onOptionsChange(newOptions)
  }

  const { spread, zoom, ...exportOptions } = currentOptions

  return (
    <Page>
      <Wrapper $showSettings={showSettings}>
        <PreviewDisplay
          isEpub={currentOptions.format === 'epub'}
          loading={loadingPreview}
          noPreview={!loadingPreview && !previewLink}
          onOptionsChange={handleOptionsChange}
          previewLink={previewLink}
          spread={spread}
          zoom={zoom}
        />

        <PreviewSettings
          canModify={canModify}
          canUploadToProvider={canUploadToProvider}
          createProfile={createProfile}
          currentOptions={exportOptions}
          defaultProfile={defaultProfile}
          deleteProfile={deleteProfile}
          download={download}
          isbns={isbns}
          isCollapsed={!showSettings}
          isDownloadButtonDisabled={isDownloadButtonDisabled}
          isUserConnectedToLulu={isUserConnectedToLulu}
          loadingPreview={loadingPreview}
          luluConfig={luluConfig}
          onClickCollapse={handleClickCollapse}
          onClickConnectToLulu={connectToLulu}
          onOptionsChange={handleOptionsChange}
          onProfileChange={onProfileChange}
          optionsDisabled={loadingExport || loadingPreview}
          profiles={profiles}
          renameProfile={renameProfile}
          selectedProfile={selectedProfile}
          sendToLulu={sendToLulu}
          templates={templates}
          updateProfileOptions={updateProfileOptions}
        />
      </Wrapper>
    </Page>
  )
}

Preview.propTypes = {
  connectToLulu: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  currentOptions: PropTypes.shape({
    format: PropTypes.oneOf(['pdf', 'epub']),
    size: PropTypes.oneOf(['8.5x11', '6x9', '5.5x8.5']),
    content: PropTypes.arrayOf(
      PropTypes.oneOf(['includeTitlePage', 'includeCopyrights', 'includeTOC']),
    ),
    template: PropTypes.string,
    spread: PropTypes.oneOf(['single', 'double']),
    zoom: PropTypes.number,
  }).isRequired,
  defaultProfile: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['pdf', 'epub']),
    size: PropTypes.oneOf(['8.5x11', '6x9', '5.5x8.5']),
    content: PropTypes.arrayOf(
      PropTypes.oneOf(['includeTitlePage', 'includeCopyrights', 'includeTOC']),
    ),
    template: PropTypes.string,
  }).isRequired,
  deleteProfile: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  canModify: PropTypes.bool.isRequired,
  canUploadToProvider: PropTypes.bool.isRequired,
  isDownloadButtonDisabled: PropTypes.bool.isRequired,
  isUserConnectedToLulu: PropTypes.bool.isRequired,
  loadingExport: PropTypes.bool.isRequired,
  loadingPreview: PropTypes.bool.isRequired,
  luluConfig: PropTypes.shape(),
  onOptionsChange: PropTypes.func.isRequired,
  onProfileChange: PropTypes.func.isRequired,
  previewLink: PropTypes.string,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
      size: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
      template: PropTypes.string,
      synced: PropTypes.bool,
      lastSynced: PropTypes.string,
      projectId: PropTypes.string,
      projectUrl: PropTypes.string,
    }),
  ).isRequired,
  renameProfile: PropTypes.func.isRequired,
  selectedProfile: PropTypes.string.isRequired,
  sendToLulu: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isbns: PropTypes.arrayOf(
    PropTypes.shape({
      isbn: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateProfileOptions: PropTypes.func.isRequired,
}

Preview.defaultProps = {
  luluConfig: null,
  previewLink: null,
}

export default Preview

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { Collapse, Radio } from '../common'

const { Panel } = Collapse

const StyledPanel = styled(Panel)`
  .ant-collapse-header {
    align-items: center !important; /* stylelint-disable-line declaration-no-important */
  }
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;

  > div {
    margin-right: ${grid(2)};
  }
`

const CopyrightLicenseOption = props => {
  const {
    title,
    description,
    link,
    linkText,
    key,
    children,
    selected,
    onChange,
    name,
    canChangeMetadata,
    ...rest
  } = props

  const handleClick = () => {
    if (canChangeMetadata) {
      onChange(name)
    }
  }

  return (
    <StyledPanel
      forceRender
      header={
        <Wrapper onClick={handleClick}>
          <div>
            <Radio
              checked={selected}
              disabled={!canChangeMetadata}
              onChange={() => onChange(name)}
            />
          </div>
          <div>
            <strong>{title}</strong>
            <p>{description}</p>
            {link && (
              <a href={link} rel="noreferrer" target="_blank">
                {linkText}
              </a>
            )}
          </div>
        </Wrapper>
      }
      key={key}
      showArrow={selected}
      {...rest}
    >
      {children}
    </StyledPanel>
  )
}

CopyrightLicenseOption.propTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  canChangeMetadata: PropTypes.bool.isRequired,
}

CopyrightLicenseOption.defaultProps = {
  link: null,
  linkText: null,
  selected: false,
  onChange: () => {},
}

export default CopyrightLicenseOption

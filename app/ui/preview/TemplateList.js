import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { grid, th } from '@coko/client'

import Template from './Template'

const Wrapper = styled.div`
  align-items: start;
  border: 1px solid ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  display: flex;
  min-height: 100px;
  overflow-x: auto;
  padding: ${grid(2)};

  > div:not(:last-child) {
    margin-right: ${grid(2)};
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`

const EmptyMessage = styled.div`
  margin-left: ${grid(3)};
`

const TemplateList = props => {
  const { className, onTemplateClick, templates, selectedTemplate, disabled } =
    props

  return (
    <Wrapper className={className} disabled={disabled}>
      {templates.length === 0 && (
        <EmptyMessage>No templates available</EmptyMessage>
      )}

      {templates.length > 0 &&
        templates.map(template => (
          <Template
            id={template.id}
            imageUrl={template.imageUrl}
            isSelected={selectedTemplate === template.id}
            key={template.id}
            name={template.name}
            onClick={onTemplateClick}
          />
        ))}
    </Wrapper>
  )
}

TemplateList.propTypes = {
  disabled: PropTypes.bool,
  onTemplateClick: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.string,
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ),
}

TemplateList.defaultProps = {
  disabled: false,
  selectedTemplate: null,
  templates: [],
}

export default TemplateList

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const ISBNInput = ({
  canChangeMetadata,
  field,
  name,
  placeholder,
  style,
  ...props
}) => {
  return (
    <Form.Item
      {...props}
      fieldKey={field.fieldKey}
      isListField
      name={[field.name, name]}
      style={{ ...style, display: 'inline-block' }}
    >
      <Input disabled={!canChangeMetadata} placeholder={placeholder} />
    </Form.Item>
  )
}

ISBNInput.defaultProps = {
  style: {},
}

ISBNInput.propTypes = {
  canChangeMetadata: PropTypes.bool.isRequired,
  field: PropTypes.shape({
    fieldKey: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    name: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}

export default ISBNInput

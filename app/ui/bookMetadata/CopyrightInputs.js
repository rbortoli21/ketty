import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, DatePicker } from 'antd'
import styled from 'styled-components'
import { Form, Input } from '../common'

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`

const CopyrightInputs = props => {
  const { namePrefix, canChangeMetadata } = props

  return (
    <Row gutter={[12, 0]}>
      <Col span={18}>
        <Form.Item
          label="Copyright holder name (optional)"
          labelCol={{ span: 24 }}
          name={`${namePrefix}CopyrightHolder`}
        >
          <Input disabled={!canChangeMetadata} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          label="Copyright year (optional)"
          labelCol={{ span: 24 }}
          name={`${namePrefix}CopyrightYear`}
        >
          <StyledDatePicker disabled={!canChangeMetadata} picker="year" />
        </Form.Item>
      </Col>
    </Row>
  )
}

CopyrightInputs.propTypes = {
  namePrefix: PropTypes.string.isRequired,
  canChangeMetadata: PropTypes.bool.isRequired,
}

export default CopyrightInputs

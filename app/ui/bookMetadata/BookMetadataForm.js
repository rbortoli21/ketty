import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import { th } from '@coko/client'
import dayjs from 'dayjs'
import mapValues from 'lodash/mapValues'
import { Form, Modal } from 'antd'
import { Input, TextArea } from '../common'
import CopyrightLicenseInput from './CopyrightLicenseInput'
import ISBNList from './ISBNList'

const StyledForm = styled(Form)`
  height: calc(100vh - 156.5px);
  margin: 0 auto;
  /* max-width: 800px; */
  overflow-y: auto;
  padding-right: 8px;
  width: 100%;
`

const FormSection = styled.div`
  border-top: 2px solid ${th('colorText')};
`

const BookMetadataForm = ({
  initialValues,
  onSubmitBookMetadata,
  canChangeMetadata,
  open,
  closeModal,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  const transformedInitialValues = mapValues(initialValues, (value, key) => {
    const dateFields = ['ncCopyrightYear', 'saCopyrightYear']
    return dateFields.includes(key) && dayjs(value).isValid()
      ? dayjs(value)
      : value
  })

  if (isEmpty(transformedInitialValues.isbns)) {
    transformedInitialValues.isbns = []
  }

  useEffect(() => {
    form.setFieldsValue(transformedInitialValues)
  }, [form, initialValues])

  return (
    <Modal
      cancelText="Close"
      centered
      destroyOnClose
      maskClosable={false}
      okButtonProps={{
        style: { backgroundColor: canChangeMetadata ? 'black' : '' },
        disabled: !canChangeMetadata,
      }}
      okText="Save"
      onCancel={closeModal}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onSubmitBookMetadata(values)
            closeModal()
          })
          .catch(info => {
            console.error('Validate Failed:', info)
          })
      }}
      open={open}
      title="Book Metadata"
      width={840}
    >
      <StyledForm
        form={form}
        initialValues={transformedInitialValues}
        preserve={false}
      >
        <p>
          This information will be used for additional book pages that are
          optional, go to Preview to see the pages and decide which ones you
          want to include in your book
        </p>
        <FormSection>
          <h2>TITLE PAGE</h2>
          <Form.Item
            label="Title"
            labelCol={{ span: 24 }}
            name="title"
            // rules={[{ required: true, message: 'Title is required' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input
              disabled={!canChangeMetadata}
              // placeholder="The history of future past"
            />
          </Form.Item>
          <Form.Item
            label="Subtitle"
            labelCol={{ span: 24 }}
            name="subtitle"
            wrapperCol={{ span: 24 }}
          >
            <Input disabled={!canChangeMetadata} placeholder="Optional" />
          </Form.Item>
          <Form.Item
            label="Authors"
            labelCol={{ span: 24 }}
            name="authors"
            // rules={[{ required: true, message: 'Authors is required' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input disabled={!canChangeMetadata} placeholder="Jhon, Smith" />
          </Form.Item>
        </FormSection>

        <FormSection>
          <h2>COPYRIGHT PAGE</h2>
          <Form.Item
            label="ISBN List"
            labelCol={{ span: 24 }}
            style={{ marginBottom: '0px' }}
            wrapperCol={{ span: 24 }}
          >
            <ISBNList canChangeMetadata={canChangeMetadata} name="isbns" />
          </Form.Item>
          <Form.Item
            label="Top of the page"
            labelCol={{ span: 24 }}
            name="topPage"
            wrapperCol={{ span: 24 }}
          >
            <TextArea
              disabled={!canChangeMetadata}
              placeholder="Optional - Provide additional description that will appear on the top of the Copyright page"
            />
          </Form.Item>
          <Form.Item
            label="Bottom of the page"
            labelCol={{ span: 24 }}
            name="bottomPage"
            wrapperCol={{ span: 24 }}
          >
            <TextArea
              disabled={!canChangeMetadata}
              placeholder="Optional - Provide additional description that will appear on the top of the Copyright page"
            />
          </Form.Item>
          <Form.Item
            label="Copyright License"
            labelCol={{ span: 24 }}
            name="copyrightLicense"
            wrapperCol={{ span: 24 }}
          >
            <CopyrightLicenseInput canChangeMetadata={canChangeMetadata} />
          </Form.Item>
        </FormSection>
      </StyledForm>
    </Modal>
  )
}

BookMetadataForm.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    authors: PropTypes.string.isRequired,
    isbns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        isbn: PropTypes.string.isRequired,
      }),
    ).isRequired,
    topPage: PropTypes.string,
    bottomPage: PropTypes.string,
    copyrightLicense: PropTypes.oneOf(['SCL', 'PD', 'CC']),
    ncCopyrightHolder: PropTypes.string,
    ncCopyrightYear: PropTypes.string,
    // ncCopyrightYear: PropTypes.instanceOf(dayjs),
    saCopyrightHolder: PropTypes.string,
    saCopyrightYear: PropTypes.string,

    // saCopyrightYear: PropTypes.instanceOf(dayjs),
    licenseTypes: PropTypes.shape({
      NC: PropTypes.bool,
      SA: PropTypes.bool,
      ND: PropTypes.bool,
    }),
    publicDomainType: PropTypes.oneOf(['cc0', 'public']),
  }).isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  canChangeMetadata: PropTypes.bool.isRequired,
  onSubmitBookMetadata: PropTypes.func.isRequired,
}

export default BookMetadataForm

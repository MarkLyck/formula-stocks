import { useState } from 'react'
import styled from '@emotion/styled'
import { Form, Typography, Button, Modal, Divider } from 'antd'

import StripeWrapper from './StripeWrapper'
import StripeElements from './StripeElements'
import PlanDetails from './PlanDetails'

const { Text } = Typography

const StyledForm = styled(Form)`
  svg {
    margin-right: 8px;
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding: 6px 2px;
  }

  .ant-select {
    height: 52px !important;
  }
  .ant-select-selector {
    height: 52px !important;
  }
  .ant-select-selection-item > div {
    height: 52px;
    display: flex;
    align-items: center;
  }
  .ant-select-selection-search {
    margin-top: 6px;
    padding-left: 28px;
  }

  .ant-input-affix-wrapper-focused {
    svg {
      color: ${(props: any) => props.theme.palette.primary[600]};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 2px;
  }
`

const validateMessages = {
  required: 'Please input your email',
  types: {
    email: 'This is not a valid email',
  },
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`

const Disclaimer = styled.div`
  text-align: center;
  font-size: 12px;
`
const Container = styled.div`
  display: flex;
`

const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

type BillingFormProps = {
  accountInfo: any
  onClose: () => void
}

const BillingForm = ({ accountInfo, onClose }: BillingFormProps) => {
  const [stripeError, setStripeError] = useState(null)
  const [form] = Form.useForm()

  return (
    <StyledModal visible={true} onCancel={onClose} footer={null} centered width={700}>
      <Container>
        <PlanDetails />
        <StyledForm
          form={form}
          style={{ padding: 16, width: '50%' }}
          name="account-form"
          initialValues={{ remember: true }}
          size="large"
          // @ts-ignore
          onFinish={console.log}
          validateMessages={validateMessages}
          validateTrigger="onSubmit"
        >
          <FormContent>
            <StripeElements setStripeError={setStripeError} />
            <div>
              <Divider />
              <Form.Item style={{ marginBottom: 6, marginTop: 16 }}>
                <Button type="primary" htmlType="submit" block>
                  Sign up for free trial
                </Button>
              </Form.Item>
              <Disclaimer>No lock-in contract, you can cancel anytime.</Disclaimer>
            </div>
          </FormContent>
        </StyledForm>
      </Container>
    </StyledModal>
  )
}

const BillingFormWrapper = (props: any) => (
  <StripeWrapper>
    <BillingForm {...props} />
  </StripeWrapper>
)

export default BillingFormWrapper

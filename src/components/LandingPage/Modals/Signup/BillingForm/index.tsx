import { useState } from 'react'
import styled from '@emotion/styled'
import { Form, Typography, Button } from 'antd'

import ScheduleToggle from 'src/components/LandingPage/Pricing/ScheduleToggle'
import StripeWrapper from './StripeWrapper'
import StripeElements from './StripeElements'
import Invoice from './Invoice'

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

const Beside = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const Disclaimer = styled.div`
  text-align: center;
  font-size: 12px;
`

type BillingFormProps = {
  accountInfo: any
}

const BillingForm = ({ accountInfo }: BillingFormProps) => {
  const [term, setTerm] = useState('annually')
  const [stripeError, setStripeError] = useState(null)
  const [form] = Form.useForm()

  return (
    <StyledForm
      form={form}
      name="account-form"
      initialValues={{ remember: true }}
      size="large"
      // @ts-ignore
      onFinish={console.log}
      validateMessages={validateMessages}
      validateTrigger="onSubmit"
    >
      <Beside>
        <Text>Billing period:</Text>
        {/* @ts-ignore */}
        <ScheduleToggle term={term} setTerm={setTerm} />
      </Beside>
      <StripeElements setStripeError={setStripeError} />
      <Invoice term={term} />

      <Form.Item style={{ marginBottom: 6, marginTop: 16 }}>
        <Button type="primary" htmlType="submit" block>
          Sign up for free trial
        </Button>
      </Form.Item>
      <Disclaimer>No lock-in contract, you can cancel anytime.</Disclaimer>
    </StyledForm>
  )
}

const BillingFormWrapper = (props: any) => (
  <StripeWrapper>
    <BillingForm {...props} />
  </StripeWrapper>
)

export default BillingFormWrapper

import { useState } from 'react'
import styled from '@emotion/styled'
import { Form, Button } from 'antd'
import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useMutation } from '@apollo/client'

import { USER_SIGNUP, USER_LOGIN } from 'src/common/queries'
import StripeWrapper from './StripeWrapper'
import StripeElements from './StripeElements'
import Invoice from './Invoice'
import handleSignup from './handleSignup'

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
`

const validateMessages = {
  required: 'Please input your email',
  types: {
    email: 'This is not a valid email',
  },
}

const Disclaimer = styled.div`
  text-align: center;
  font-size: 12px;
`

type BillingFormProps = {
  plan: 'entry' | 'premium'
  accountInfo: any
  schedule: 'monthly' | 'yearly'
}

const BillingForm = ({ plan, accountInfo, schedule }: BillingFormProps) => {
  const stripe: any = useStripe()
  const elements: any = useElements()
  const [stripeError, setStripeError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [userSignup] = useMutation(USER_SIGNUP)
  const [userLogin] = useMutation(USER_LOGIN)

  const handleSubmit = async (values: any) => {
    // Don't bother trying if there is a stripe error.
    if (stripeError) return

    setLoading(true)

    // Stripe uses this  to get all the card data
    const cardNumberElement = elements.getElement(CardNumberElement)
    stripe.createToken(cardNumberElement).then((payload: any) => {
      if (payload.error) {
        setStripeError(payload.error.message)
        setLoading(false)
        return null
      }

      if (payload.token) {
        handleSignup({
          userSignup,
          userLogin,
          plan,
          accountInfo,
          stripeToken: payload.token,
          setSuccess,
        })
      }
    })
  }

  return (
    <StyledForm
      form={form}
      name="account-form"
      initialValues={{ remember: true }}
      size="large"
      // @ts-ignore
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      validateTrigger="onSubmit"
    >
      <StripeElements setStripeError={setStripeError} stripeError={stripeError} />
      <Invoice schedule={schedule} plan={plan} />

      <Form.Item style={{ marginBottom: 6, marginTop: 16 }}>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Try it free for 7 days
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

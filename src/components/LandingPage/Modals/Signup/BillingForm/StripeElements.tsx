import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import styled from '@emotion/styled'
import { Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from 'src/lib/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .stripe-input {
    padding: 17px 11px 17px 40px;
    font-size: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    line-height: 1.5715;
  }
`

const Beside = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  > div {
    width: calc(50% - 8px);
  }
`

const Field = styled.div`
  position: relative;
`
const FieldIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
`

const stripeElementOptions = {
  style: {
    invalid: {
      color: theme.palette.danger[600],
    },
  },
}

const StripeElements = ({ setStripeError }: any) => {
  //   const stripe = useStripe()
  //   const elements = useElements()

  const onInteract = () => {
    setStripeError(null)
  }

  return (
    <Container>
      <Field>
        <FieldIcon icon={['fad', 'credit-card']} />
        {/* @ts-ignore */}
        <CardNumberElement className="stripe-input" options={stripeElementOptions} onChange={onInteract} />
      </Field>
      <Beside>
        <Field>
          <FieldIcon icon={['fad', 'calendar']} />
          {/* @ts-ignore */}
          <CardExpiryElement className="stripe-input" options={stripeElementOptions} onChange={onInteract} />
        </Field>
        <Field>
          <FieldIcon icon={['fad', 'lock-alt']} />
          {/* @ts-ignore */}
          <CardCvcElement className="stripe-input" options={stripeElementOptions} onChange={onInteract} />
        </Field>
      </Beside>
    </Container>
  )
}

export default StripeElements

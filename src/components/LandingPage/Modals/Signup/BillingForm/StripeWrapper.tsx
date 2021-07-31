import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_API_KEY } from 'src/common/constants'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_API_KEY)

const StripeWrapper = ({ children }: any) => {
  return <Elements stripe={stripePromise}>{children}</Elements>
}

export default StripeWrapper

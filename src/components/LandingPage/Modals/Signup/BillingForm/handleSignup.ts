import { hasStorage, isBrowser } from 'src/common/utils/featureTests'

const handleSignup = async ({
  userSignup,
  userLogin,
  accountInfo,
  plan,
  name,
  billingPeriod,
  coupon,
  setSuccess,
  stripeToken,
  setSignupError,
  router,
}: any) => {
  setSignupError(null)
  try {
    await userSignup({
      variables: {
        plan,
        billingPeriod,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        email: accountInfo.email,
        password: accountInfo.password,
        country: accountInfo.country,
        stripeToken,
        coupon,
      },
    })

    const loginData = await userLogin({ variables: { email: accountInfo.email, password: accountInfo.password } })

    // save authToken
    const authToken = loginData.data.userLogin.auth.idToken
    if (hasStorage) localStorage.authToken = authToken
    // @ts-ignore
    if (isBrowser) window.authToken = authToken

    setSuccess()

    // shortly show the signup success message before sending them to the dashboard
    setTimeout(() => router.push('/dashboard/stocktip'), 200)
  } catch (error) {
    let errorMessage = error.message

    if (error.errors && error.errors.length && error.errors[0] && error.errors[0].message) {
      errorMessage = error.errors[0].message
    } else if (error.graphQLErrors && error.graphQLErrors.length) {
      const graphQLError = error.graphQLErrors[0]
      console.log('🔈 ~ graphQLError', graphQLError)

      if (graphQLError.details && graphQLError.details.password) errorMessage = error.graphQLErrors[0].details.password
      if (graphQLError.details && graphQLError.details.email) errorMessage = error.graphQLErrors[0].details.email
      // handle stripe errors from GQL trigger.before
      if (graphQLError.message?.includes('stripe')) {
        const rawError = JSON.parse(graphQLError.message)
        if (rawError.raw && rawError.raw.message) errorMessage = rawError.raw.message
        if (rawError.raw.code === 'card_declined') {
          errorMessage = 'Your card was declined. Please check your card details.'
        }
      } else {
        errorMessage = graphQLError ? graphQLError.code : 'Something went wrong, please try again later'
        if (graphQLError.details && graphQLError.details.password) {
          errorMessage = graphQLError.details.password
        }
      }
    }
    if (errorMessage.includes('userSignUpWithPassword')) {
      errorMessage = 'Something went wrong, please try again later'
    }

    setSignupError(errorMessage)
  }
}

export default handleSignup

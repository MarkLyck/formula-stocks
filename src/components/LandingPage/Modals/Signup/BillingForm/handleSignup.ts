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
  const firstName = name.split(' ')[0]
  const lastName = name.split(' ').slice(1).join(' ')

  try {
    await userSignup({
      variables: {
        plan,
        billingPeriod,
        firstName,
        lastName,
        email: accountInfo.email,
        password: accountInfo.password,
        country: accountInfo.country,
        stripeToken,
        coupon,
      },
    })
    woopra.identify({ email: accountInfo.email, uniq: btoa(accountInfo.password), name: `${firstName} ${lastName}` })
    const loginData = await userLogin({ variables: { email: accountInfo.email, password: accountInfo.password } })

    // save authToken
    const authToken = loginData.data.userLogin.auth.idToken
    if (hasStorage) localStorage.authToken = authToken
    // @ts-ignore
    if (isBrowser) window.authToken = authToken

    setSuccess()

    woopra.track('signup')

    router.push('/dashboard/portfolio')
  } catch (error) {
    let errorMessage = error.message

    if (error.errors && error.errors.length && error.errors[0] && error.errors[0].message) {
      errorMessage = error.errors[0].message
    } else if (error.graphQLErrors && error.graphQLErrors.length) {
      const graphQLError = error.graphQLErrors[0]

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

    woopra.track('Signup - Error submiting', { error: errorMessage })
    setSignupError(errorMessage)
  }
}

export default handleSignup

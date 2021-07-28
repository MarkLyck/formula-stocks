const handleSignup = async ({
  userSignup,
  userLogin,
  accountInfo,
  plan,
  schedule,
  coupon,
  setSuccess,
  stripeToken,
  setSignupError,
}: any) => {
  setSignupError(null)
  try {
    await userSignup({
      variables: {
        plan,
        billingInterval: schedule,
        firstName: accountInfo.name.split(' ')[0],
        lastName: accountInfo.name.split(' ').slice(1).join(' '),
        coupon,
        email: accountInfo.email,
        password: accountInfo.password,
        stripeToken,
      },
    })

    const loginData = await userLogin({ variables: { email: accountInfo.email, password: accountInfo.password } })

    // save authToken
    const authToken = loginData.data.userLogin.auth.idToken
    if (hasStorage) localStorage.authToken = authToken
    // @ts-ignore
    if (isBrowser) window.authToken = authToken

    setSuccess()
    Mixpanel.track('Signup success', { email: accountInfo.email })

    // shortly show the signup success message before sending them to the dashboard
    setTimeout(() => Router.push('/dashboard/stocktip'), 200)
  } catch (error) {
    Mixpanel.track('[ERROR] Signup', { error: error })
    let errorMessage = error.message

    if (error.errors && error.errors.length && error.errors[0] && error.errors[0].message) {
      errorMessage = error.errors[0].message
    } else if (error.graphQLErrors && error.graphQLErrors.length) {
      const graphQLError = error.graphQLErrors[0]

      if (graphQLError.details && graphQLError.details.password) errorMessage = error.graphQLErrors[0].details.password
      if (graphQLError.details && graphQLError.details.email) errorMessage = error.graphQLErrors[0].details.email
      // handle stripe errors from GQL trigger.before
      if (graphQLError.message.includes('stripe')) {
        Mixpanel.track('[ERROR] Stripe', { error: graphQLError.message })
        const rawError = JSON.parse(graphQLError.message)
        if (rawError.raw && rawError.raw.message) errorMessage = rawError.raw.message
        if (rawError.raw.code === 'card_declined') {
          errorMessage = 'Your card was declined. Please check your card details.'
        }
      } else {
        Mixpanel.track('[ERROR] GraphQL', { error: graphQLError })
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

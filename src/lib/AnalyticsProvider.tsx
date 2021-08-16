import { usePlausible } from 'next-plausible'
import LogRocket from 'logrocket'
import * as Sentry from '@sentry/nextjs'

const analyticsInit = () => {
  LogRocket.init('hlvawe/formula-stocks')
  LogRocket.getSessionURL((sessionURL) => {
    if (sessionURL) {
      Sentry.configureScope((scope) => {
        scope.setExtra('sessionURL', sessionURL)
      })
      woopra.track('session_url', { url: sessionURL })
    }
  })
}

// Only initialize analytics in production
if (process.env.NODE_ENV === 'production') {
  analyticsInit()
}

const analyticsTrack = (plausible: any) => (key: string, data: any) => {
  woopra.track(key, data)
  plausible(key, { props: data })
}

const analyticsIdentify = (data: any) => {
  woopra.identify(data).push()
  LogRocket.identify(data.email, { ...data })
}

const AnalyticsProvider = ({ children }: any) => {
  const plausible = usePlausible()

  if (process.browser) {
    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      window.analyticsTrack = analyticsTrack(plausible)
      // @ts-ignore
      window.analyticsIdentify = analyticsIdentify
    } else {
      // @ts-ignore
      window.analyticsTrack = () => {}
      // @ts-ignore
      window.analyticsIdentify = () => {}
    }
  }

  return children
}

export default AnalyticsProvider

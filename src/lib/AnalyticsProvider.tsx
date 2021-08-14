import { usePlausible } from 'next-plausible'
import LogRocket from 'logrocket'
import * as Sentry from '@sentry/nextjs'

LogRocket.init('hlvawe/formula-stocks')
LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra('sessionURL', sessionURL)
  })
})

const analyticsTrack = (plausible: any) => (key: string, data: any) => {
  // woopra tracking
  woopra.track(key, data)
  // plausible tracking
  plausible(key, {
    props: data,
  })
}

const analyticsIdentify = (data: any) => {
  woopra.identify(data).push()
  LogRocket.identify(data.email, { ...data })
}

const AnalyticsProvider = ({ children }: any) => {
  const plausible = usePlausible()

  // @ts-ignore
  if (process.browser) {
    // @ts-ignore
    window.track = analyticsTrack(plausible)
    // @ts-ignore
    window.analyticsIdentify = analyticsIdentify
  }

  return children
}

export default AnalyticsProvider

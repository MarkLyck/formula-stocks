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
      gtag('event', 'session_url', {
        event_category: 'recording',
        event_label: sessionURL,
        non_interaction: true,
      })
    }
  })
}

// Only initialize analytics in production
if (process.env.NODE_ENV === 'production' && process.browser && window.location.href.includes('formulastocks.com')) {
  analyticsInit()
}

const analyticsTrack = (key: string, data: any) => {
  woopra.track(key, data)
  gtag('event', key, {
    event_category: data?.category,
    event_label: data?.label,
    value: data?.value,
    non_interaction: data?.passive,
  })
}

const analyticsIdentify = (data: any) => {
  woopra.identify(data).push()
  LogRocket.identify(data.email, { ...data })
}

const AnalyticsProvider = ({ children }: any) => {
  if (process.browser) {
    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      window.analyticsTrack = analyticsTrack
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

import { usePlausible } from 'next-plausible'
import LogRocket from 'logrocket'

LogRocket.init('hlvawe/formula-stocks')

const analyticsTrack = (plausible: any) => (key: string, data: any) => {
  // woopra tracking
  woopra.track(key, data)
  // plausible tracking
  plausible(key, {
    props: data,
  })
}

const AnalyticsProvider = ({ children }: any) => {
  const plausible = usePlausible()

  // @ts-ignore
  if (process.browser) {
    // @ts-ignore
    window.track = analyticsTrack(plausible)
  }

  return children
}

export default AnalyticsProvider

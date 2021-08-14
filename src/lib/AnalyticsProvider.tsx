import { usePlausible } from 'next-plausible'

const AnalyticsProvider = ({ children }: any) => {
  const plausible = usePlausible()
  console.log('🔈 ~ plausible', plausible)

  const analyticsTrack = (key: string, data: any) => {
    // woopra tracking
    woopra.track(key, data)
    // plausible tracking
    plausible(key, {
      props: data,
    })
  }

  if (process.browser) {
    // @ts-ignore
    window.track = analyticsTrack
  }

  return children
}

export default AnalyticsProvider

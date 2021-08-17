declare global {
  interface Window {
    gtag: any
    woopra: any
    analyticsTrack: any
    analyticsIdentify: any
    $crisp: any
  }
}

let gtag = typeof window !== 'undefined' ? window.gtag : {}
let woopra = typeof window !== 'undefined' ? window.woopra : {}
let analyticsTrack = typeof window !== 'undefined' ? window.analyticsTrack : {}
let analyticsIdentify = typeof window !== 'undefined' ? window.analyticsIdentify : {}
let $crisp = typeof window !== 'undefined' ? window.$crisp : {}

declare global {
  interface Window {
    woopra: any
    analyticsTrack: any
    analyticsIdentify: any
  }
}

let woopra = typeof window !== 'undefined' ? window.woopra : {}
let analyticsTrack = typeof window !== 'undefined' ? window.analyticsTrack : {}
let analyticsIdentify = typeof window !== 'undefined' ? window.analyticsIdentify : {}

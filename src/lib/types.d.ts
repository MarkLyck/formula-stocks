declare global {
  interface Window {
    woopra: any
    track: any
    analyticsIdentify: any
  }
}

let woopra = typeof window !== 'undefined' ? window.woopra : {}
let track = typeof window !== 'undefined' ? window.track : {}
let analyticsIdentify = typeof window !== 'undefined' ? window.analyticsIdentify : {}

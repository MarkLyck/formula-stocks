declare global {
  interface Window {
    woopra: any
    track: any
  }
}

let woopra = typeof window !== 'undefined' ? window.woopra : {}
let track = typeof window !== 'undefined' ? window.track : {}

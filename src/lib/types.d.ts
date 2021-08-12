declare global {
  interface Window {
    woopra: any
  }
}

let woopra = typeof window !== 'undefined' ? window.woopra : {}

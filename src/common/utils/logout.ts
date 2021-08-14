import { hasStorage, isBrowser } from 'src/common/utils/featureTests'
import Router from 'next/router'

export const logout = (event?: any, to?: string) => {
  if (event?.preventDefault) event.preventDefault()
  track('logout')

  // @ts-ignore
  if (isBrowser) window.authToken = undefined

  if (hasStorage) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  }

  Router.push(to ? to : '/')
}

import React, { useState } from 'react'
import Router from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { logout } from 'src/common/utils'
import { hasStorage, isBrowser } from 'src/common/utils/featureTests'
import { CURRENT_USER_QUERY } from 'src/common/queries'

import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LogoutButton from './LogoutButton'
import DashboardButton from './DashboardButton'

const Container = styled.div`
  display: flex;
  margin-left: auto;
`

const LoginItems = ({ showSignup, dark }: any) => {
  const { error } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })
  const [loggedIn, setLoggedIn] = useState(
    // @ts-ignore window.authToken
    (hasStorage && localStorage.getItem('authToken')) || (isBrowser && window.authToken)
  )

  if (!process.browser) return null

  const handleLogout = () => {
    analyticsTrack('logout')
    logout()
    setLoggedIn(false)
  }

  if (loggedIn && error) {
    if (error.message.includes('Token')) {
      handleLogout()
      window?.location?.reload()
    }
  }

  const handleDashboardClick = () => {
    analyticsTrack('navigate', { to: '/dashboard' })
    Router.push('/dashboard')
  }

  const handleSignupClick = () => {
    showSignup()
  }

  if (loggedIn && process.browser) {
    return (
      <Container>
        <LogoutButton onClick={handleLogout} />
        <DashboardButton onClick={handleDashboardClick} />
      </Container>
    )
  }

  return (
    <Container>
      <LoginButton dark={dark} />
      <SignupButton onClick={handleSignupClick} />
    </Container>
  )
}

export default LoginItems

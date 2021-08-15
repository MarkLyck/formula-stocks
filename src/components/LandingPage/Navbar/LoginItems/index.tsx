import React, { useState } from 'react'
import Router from 'next/router'
import { Space } from 'antd'
import { useQuery } from '@apollo/client'

import { logout } from 'src/common/utils'
import { hasStorage, isBrowser } from 'src/common/utils/featureTests'
import { CURRENT_USER_QUERY } from 'src/common/queries'

import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LogoutButton from './LogoutButton'
import DashboardButton from './DashboardButton'

const LoginItems = ({ showSignup }: any) => {
  const { error } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })
  const [loggedIn, setLoggedIn] = useState(
    // @ts-ignore window.authToken
    (hasStorage && localStorage.getItem('authToken')) || (isBrowser && window.authToken)
  )

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
    analyticsTrack('click', { element: 'signup button' })
    showSignup()
  }

  if (loggedIn && process.browser) {
    return (
      <Space>
        <LogoutButton onClick={handleLogout} />
        <DashboardButton onClick={handleDashboardClick} />
      </Space>
    )
  }

  return (
    <Space>
      <LoginButton />
      <SignupButton onClick={handleSignupClick} />
    </Space>
  )
}

export default LoginItems

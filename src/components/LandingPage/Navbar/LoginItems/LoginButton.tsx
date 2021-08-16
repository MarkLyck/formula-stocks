import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from 'src/ui-components'
import { LoginModal } from 'src/components/LandingPage/Modals'

const StyledButton = styled(Button)`
  color: ${(p: any) => p.theme.palette.neutral[p.dark ? 600 : 100]};
  width: 120px;
`

const LoginButton = (props: any) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <LoginModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
      <StyledButton appearance="ghost" onClick={() => setIsVisible(true)} {...props}>
        Login
      </StyledButton>
    </>
  )
}

export default LoginButton

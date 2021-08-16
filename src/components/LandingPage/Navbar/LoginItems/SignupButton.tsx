import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'src/ui-components'

const StyledButton = styled(Button)`
  width: 130px;
  height: 44px;
  display: flex;
  justify-content: center;
  padding: 15px;
`

const SignupButton = (props: any) => (
  <StyledButton status="success" {...props}>
    Sign up now
  </StyledButton>
)

export default SignupButton

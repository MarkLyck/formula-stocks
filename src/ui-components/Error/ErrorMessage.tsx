import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p: any) => p.theme.palette.danger[600]};
  background: ${(p: any) => p.theme.palette.danger[200]};
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;

  svg {
    margin-right: 8px;
    font-size: 1.2rem;
  }
`

const ErrorMessage = ({ children }: { children: any }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={['fad', 'exclamation-square']} />
      {children}
    </Container>
  )
}

export default ErrorMessage

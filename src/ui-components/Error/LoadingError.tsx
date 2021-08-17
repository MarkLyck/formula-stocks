import React from 'react'
import styled from '@emotion/styled'
import { Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { hasStorage } from 'src/common/utils/featureTests'
import { logout } from 'src/common/utils'
import PermissionError from './PermissionError'
import { Card } from 'src/ui-components'
import { ErrorHeader, ErrorText } from './styles'

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;

  svg {
    color: ${(p) => p.theme.palette.danger[600]};
    font-size: 32px;
  }

  button {
    svg {
      color: inherit;
      font-size: 12px;
    }
  }
`

const refreshPage = () => {
  location.reload()
}

const error = `
{
    "data": null,
    "errors": [
        {
            "message": "You don't have permission to perform this operation",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "portfolioHoldingsList"
            ],
            "code": "NotAuthorizedError",
            "details": {
                "permissions": "You don't have permission to perform this operation"
            }
        }
    ]
}
`

const LoadingError = ({ error }: any) => {
  analyticsTrack('error', { message: error.message })
  let errorText = 'Please try to refresh the page.'
  // @ts-ignore
  const authToken = (hasStorage && localStorage.getItem('authToken')) || (process.browser && window?.authToken)

  if (!authToken) {
    logout(undefined, '/dashboard/login')
    return null
  }

  if (error && error.message.includes('permission')) {
    return <PermissionError />
  } else if ((error && error.message.includes('Token expired')) || error.message === 'Token validation') {
    logout(undefined, '/dashboard/login')
    return null
  }

  return (
    <Container>
      <Space direction="vertical" align="center" size="middle">
        <FontAwesomeIcon icon={['fad', 'exclamation-square']} />
        <ErrorHeader>Oups! Something went wrong</ErrorHeader>
        <ErrorText>{errorText}</ErrorText>
        <Button onClick={refreshPage} icon={<FontAwesomeIcon icon={['far', 'redo']} />}>
          Refresh page
        </Button>
      </Space>
    </Container>
  )
}

export default LoadingError

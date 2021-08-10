import { useRouter } from 'next/router'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card, ButtonIcon } from 'src/ui-components'
import useStore from 'src/lib/useStore'

const Container = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;

  svg {
    color: ${(p) => p.theme.palette.warning[500]};
    font-size: 32px;
  }

  button {
    svg {
      color: inherit;
      font-size: 12px;
    }
  }
`

const ErrorHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 16px;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`

const ErrorText = styled.p`
  color: ${(props: any) => props.theme.palette.text[500]};
  text-align: center;
`

export const PermissionWrapper = ({ children, ErrorComponent }: any) => {
  const router = useRouter()
  const { user, userRoles } = useStore((state: any) => ({ user: state.user, userRoles: state.userRoles }))

  if (!children) return null
  if (user === null) return children

  let title = 'Inactive subscription'
  let text = 'Your subscription seems to be inactive, you can re-active your subscription on the account page.'
  let buttonText = 'Go to Account page'

  const goToAccount = () => {
    router.push('/dashboard/account')
  }

  if (!userRoles?.includes('Subscriber')) {
    if (ErrorComponent !== undefined) return ErrorComponent

    return (
      <Container>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} />
        <ErrorHeader>{title}</ErrorHeader>
        <ErrorText>{text}</ErrorText>
        <Button onClick={goToAccount} icon={<ButtonIcon icon={['fad', 'user']} />}>
          {buttonText}
        </Button>
      </Container>
    )
  }

  return children
}

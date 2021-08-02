import styled from '@emotion/styled'

const WelcomeBack = styled.h2`
  color: ${(props: any) => props.theme.palette.neutral[800]};
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.4rem;
  margin-bottom: 0px;
`

const Subtitle = styled.h4`
  color: ${(props: any) => props.theme.palette.neutral[800]};
  margin-bottom: 24px;
  font-weight: 400;
`

type AccountHeaderProps = {
  user: any
}

const AccountHeader = ({ user }: AccountHeaderProps) => {
  return (
    <>
      <WelcomeBack>Welcome back, {user?.firstName}</WelcomeBack>
      <Subtitle>{user?.email}</Subtitle>
    </>
  )
}

export default AccountHeader

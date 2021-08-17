import { Spin, Typography } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  svg {
    font-size: 128px;
    margin-bottom: 32px;
    color: ${(p) => p.theme.palette.neutral[500]};
  }

  h3 {
    color: ${(p) => p.theme.palette.neutral[600]};
    font-weight: 400;
    margin-bottom: 16px;
  }
`

type LoadingPageProps = {
  title?: string
  icon: any
}

export const LoadingPage = ({ title = 'Loading...', icon }: LoadingPageProps) => (
  <Container>
    <FontAwesomeIcon icon={icon} />
    <Typography.Title level={3}>{title}</Typography.Title>
    <Spin size="large" />
  </Container>
)

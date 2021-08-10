import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colorMap = {
  trialing: 'primary',
  active: 'success',
  canceled: 'danger',
  paused: 'warning',
}

const iconMap = {
  trialing: ['fad', 'hourglass-start'],
  active: ['fas', 'check'],
  paused: ['fad', 'pause'],
  canceled: ['fas', 'times'],
}

const Container = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  text-transform: capitalize;
  font-weight: bold;
  display: flex;
  align-items: center;
  background: ${(p: any) => p.theme.palette[p.color][200]};
  color: ${(p: any) => p.theme.palette[p.color][600]};
  border: 1px solid ${(p: any) => p.theme.palette[p.color][300]};
`

const SubscriptionStatus = ({ status }: any) => {
  if (!status) return null
  return (
    // @ts-ignore
    <Container color={colorMap[status]}>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={iconMap[status]} style={{ marginRight: 8, fontSize: 14 }} />
      {status}
    </Container>
  )
}

export default SubscriptionStatus

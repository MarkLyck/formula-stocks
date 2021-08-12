import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colorMap = {
  trialing: 'primary',
  active: 'success',
  canceled: 'danger',
  unpaid: 'danger',
  paused: 'warning',
  admin: 'neutral',
}

const iconMap = {
  trialing: ['fad', 'hourglass-start'],
  active: ['fas', 'check'],
  paused: ['fad', 'pause'],
  canceled: ['fas', 'times'],
  unpaid: ['fad', 'money-bill'],
  admin: ['fad', 'tools'],
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

export const getSubscriptionStatus = (subscription: any, type?: string) => {
  if (!subscription) return null
  if (type === 'admin') return 'admin'

  let status = subscription?.status
  if (subscription?.pause_collection) {
    status = 'paused'
  }
  if (subscription?.cancel_at_period_end) {
    status = 'canceled'
  }

  return status
}

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

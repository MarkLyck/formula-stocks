import { Typography } from 'antd'
import styled from '@emotion/styled'
import dayjs from 'dayjs'

const { Text } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

const CurrentSubscription = ({ subscription, status }: any) => {
  if (!subscription) return null

  const now = Math.floor(Date.now() / 1000)
  const isBillingDateInFuture = subscription.current_period_end >= now

  const subscriptionStartDate = dayjs.unix(subscription.created).format('MMMM Do YYYY')
  const nextBillingDate = dayjs.unix(subscription.current_period_end).format('MMMM Do YYYY')

  return (
    <Container>
      <Text>
        Status: <b>{status}</b>
      </Text>
      <Text>
        Price:{' '}
        <b>
          ${subscription.plan.amount / 100} / {subscription.plan.interval}
        </b>
      </Text>
      <Text>
        Subscription started on: <b>{subscriptionStartDate}</b>
      </Text>
      {status === 'paused' && (
        <Text>
          Subscription resumes on: <b>{dayjs.unix(subscription.pause_collection.resumes_at).format('MMMM Do YYYY')}</b>
        </Text>
      )}
      {isBillingDateInFuture && status === 'active' && (
        <Text>
          Next billing date: <b>{nextBillingDate}</b>
        </Text>
      )}
    </Container>
  )
}

export default CurrentSubscription

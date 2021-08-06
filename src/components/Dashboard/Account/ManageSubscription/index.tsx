import React from 'react'
import styled from '@emotion/styled'
import { Card, Spin } from 'antd'

import Error from './Error'
import Cancel from './Cancel'
import Pause from './Pause'
import ReActivate from './ReActivate'
import CurrentSubscription from './CurrentSubscription'

import { subscriptionType } from './types'

interface SubscriptionPropsType {
  subscription?: subscriptionType
  updateUser: () => void
  user: any
  userLoading: boolean
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    width: calc(50% - 4px);
  }

  svg {
    margin-right: 8px;
  }
`

const Subscription = ({ subscription, updateUser, user, userLoading }: SubscriptionPropsType) => {
  let status = subscription?.status
  if (subscription?.pause_collection) {
    status = 'paused'
  }
  if (subscription?.cancel_at_period_end) {
    status = 'canceled'
  }

  return (
    <Card title="Subscription">
      {userLoading ? (
        <Spin />
      ) : (
        <>
          <CurrentSubscription subscription={subscription} status={status} />
          <Error subscription={subscription} />
          <ButtonContainer>
            {status === 'active' && <Pause subscription={subscription} user={user} />}
            <Cancel subscription={subscription} updateUser={updateUser} user={user} />
          </ButtonContainer>
          <ReActivate subscription={subscription} user={user} />
        </>
      )}
    </Card>
  )
}

export default Subscription

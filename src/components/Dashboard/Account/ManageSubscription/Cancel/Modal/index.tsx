import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { useLazyQuery } from '@apollo/client'
import { CANCEL_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from '~/common/queries'

// pages
import CancelOptions from './CancelOptions'
import TooExpensive from './TooExpensive'
import UnhappyReturns from './UnhappyReturns'

import Other from './Other'
import Success from './Success'
import DiscountSuccess from './DiscountSuccess'
import Error from './Error'

type onCancelType = () => void

type CancelModalPropsType = {
  open: boolean
  onModalDismiss: () => void
  user: any
  subscription: any
  updateUser: (arg0: { variables: { id: string; cancelReason: string } }) => Promise<any>
}

const CancelModal = ({ open, onModalDismiss, user, subscription, updateUser }: CancelModalPropsType) => {
  let [page, setPage] = useState('OPTIONS')
  const [cancelReason, setCancelReason] = useState('')
  const [
    executeCancelSubscription,
    { called: cancelCalled, data: cancelData, loading: cancelLoading, error: cancelError },
  ] = useLazyQuery(CANCEL_SUBSCRIPTION)

  const [
    executeApplySubscriptionCoupon,
    { called: applyCouponCalled, data: applyCouponData, loading: applyCouponLoading, error: applyCouponError },
  ] = useLazyQuery(UPDATE_SUBSCRIPTION)

  if (cancelCalled && cancelError && page !== 'ERROR') {
    setPage('ERROR')
  } else if (cancelCalled && cancelData && !cancelError && page !== 'SUCCESS') {
    setPage('SUCCESS')
  } else if (applyCouponCalled && applyCouponData && page !== 'DISCOUNT_SUCCESS') {
    setPage('DISCOUNT_SUCCESS')
  }

  if (applyCouponError) {
    console.error('applyCouponError', applyCouponError)
  }

  const closeModal = () => {
    setPage('OPTIONS')
    onModalDismiss()
  }

  const onCancel: onCancelType = async () => {
    executeCancelSubscription({
      variables: { subscriptionID: subscription.id, cancel_at_period_end: true, email: user.email },
    })

    await updateUser({ variables: { id: user.id, cancelReason } })
  }

  const onApplyDiscount = async () => {
    executeApplySubscriptionCoupon({
      variables: { subscriptionID: subscription.id, coupon: 'CANCEL_DISCOUNT_12_WEEKS' },
    })
  }

  const Pages = {
    OPTIONS: <CancelOptions setPage={setPage} />,
    TOO_EXPENSIVE: (
      <TooExpensive
        cancelLoading={cancelLoading}
        onCancel={onCancel}
        onApplyDiscount={onApplyDiscount}
        applyCouponLoading={applyCouponLoading}
      />
    ),
    UNHAPPY_RETURNS: (
      <UnhappyReturns
        user={user}
        cancelLoading={cancelLoading}
        onCancel={onCancel}
        onApplyDiscount={onApplyDiscount}
        applyCouponLoading={applyCouponLoading}
      />
    ),
    OTHER: (
      <Other
        setCancelReason={setCancelReason}
        cancelReason={cancelReason}
        cancelLoading={cancelLoading}
        onCancel={onCancel}
      />
    ),
    SUCCESS: <Success onModalDismiss={onModalDismiss} />,
    ERROR: <Error onModalDismiss={onModalDismiss} />,
    DISCOUNT_SUCCESS: <DiscountSuccess onModalDismiss={onModalDismiss} />,
  }

  const titleMap = {
    OPTIONS: "We're sorry to see you go!",
    TOO_EXPENSIVE: 'We can help with that.',
    OTHER: 'Please tell us!',
    ERROR: 'Whoops...',
    SUCCESS: "We're sorry to see you go!",
    DISCOUNT_SUCCESS: 'Discount applied!',
  }

  return (
    <Modal
      // @ts-ignore
      title={titleMap[page]}
      visible={open}
      onOk={() => {}}
      onCancel={closeModal}
      width={page === 'OPTIONS' || page === 'OTHER' || page === 'SUCCESS' || page === 'DISCOUNT_SUCCESS' ? 500 : 800}
      footer={[
        <Button key="dismiss" onClick={closeModal}>
          Dismiss
        </Button>,
      ]}
    >
      {/* @ts-ignore */}
      {Pages[page]}
    </Modal>
  )
}

export default CancelModal

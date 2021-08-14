import React, { useState } from 'react'
import { Modal, Typography } from 'antd'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'

import PlanPicker from './PlanPicker'
import SchedulePicker from './SchedulePicker'
import BillingForm from './BillingForm'

const AccountForm = dynamic(() => import('./AccountForm'))

interface SignupModalProps {
  onClose: () => void
  isVisible?: boolean
}

const ModalContent = styled.div`
  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 2px;
  }
`

const SignupModal = ({ onClose, isVisible }: SignupModalProps) => {
  const [page, setPage] = useState(1)
  const [plan, setPlan] = useState<'entry' | 'premium'>('entry')
  const [schedule, setSchedule]: any = useState('yearly')
  const [accountInfo, setAccountInfo] = useState(null)

  let title = 'Sign up'
  if (page === 1) title = 'Choose a plan'
  if (page === 2) title = 'Select payment schedule'
  if (page === 3) title = 'Create account'
  if (page === 4) title = 'Payment details'

  const nextPage = () => {
    if (page === 2) {
      track('navigate', { to: 'account details' })
    }
    setPage(page + 1)
  }

  const handleAccountInfoSubmit = (values: any) => {
    analyticsIdentify.identify({ email: values.email })
    track('navigate', { to: 'billing' })
    setAccountInfo(values)
    nextPage()
  }

  const handleSelectPlan = (plan: 'entry' | 'premium') => {
    track('navigate', { to: 'payment schedule' })
    setPlan(plan)
    nextPage()
  }

  const onCancel = () => {
    track('close_modal', { name: 'signup' })
    onClose()
    setPage(1)
  }

  return (
    <Modal visible={isVisible} onCancel={onCancel} footer={null} centered width={page === 1 ? 700 : undefined}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        {title}
      </Typography.Title>
      <ModalContent>
        {page === 1 && <PlanPicker setPlan={handleSelectPlan} />}
        {page === 2 && <SchedulePicker plan={plan} schedule={schedule} setSchedule={setSchedule} onSubmit={nextPage} />}
        {page === 3 && <AccountForm onSubmit={handleAccountInfoSubmit} />}
        {page === 4 && <BillingForm accountInfo={accountInfo} schedule={schedule} plan={plan} />}
      </ModalContent>
    </Modal>
  )
}

export default SignupModal

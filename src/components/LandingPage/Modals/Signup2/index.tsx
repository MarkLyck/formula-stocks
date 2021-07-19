import React, { useState } from 'react'
import { Modal, Typography } from 'antd'
import dynamic from 'next/dynamic'

import PlanPicker from './PlanPicker'
import SchedulePicker from './SchedulePicker'

const AccountForm = dynamic(() => import('./AccountForm'))

interface SignupModalProps {
  onClose: () => void
  isVisible?: boolean
}

const SignupModal = ({ onClose, isVisible }: SignupModalProps) => {
  const [page, setPage] = useState(1)
  const [plan, setPlan] = useState('')
  const [schedule, setSchedule] = useState('yearly')
  const [accountInfo, setAccountInfo] = useState(null)

  let title = 'Sign up'
  if (page === 1) title = 'Choose a plan'
  if (page === 2) title = 'Select payment schedule'
  if (page === 3) title = 'Create account'

  const handleAccountInfoSubmit = (values: any) => {
    setAccountInfo(values)
    setPage(2)
  }

  const handleSelectPlan = (plan: string) => {
    setPlan(plan)
    setPage(2)
  }

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
      <Typography.Title level={3}>{title}</Typography.Title>
      {page === 1 && <PlanPicker setPlan={handleSelectPlan} />}
      {page === 2 && <SchedulePicker plan={plan} schedule={schedule} setSchedule={setSchedule} />}
      {page === 3 && <AccountForm onSubmit={handleAccountInfoSubmit} />}
    </Modal>
  )
}

export default SignupModal

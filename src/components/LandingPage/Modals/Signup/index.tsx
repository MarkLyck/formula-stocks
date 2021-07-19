import React, { useState } from 'react'
import { Modal } from 'antd'
import dynamic from 'next/dynamic'

import { ModalTitle } from 'src/ui-components'

const AccountForm = dynamic(() => import('./AccountForm'))
const BillingForm = dynamic(() => import('./BillingForm2'))

interface SignupModalProps {
  onClose: () => void
  isVisible?: boolean
}

const SignupModal = ({ onClose, isVisible }: SignupModalProps) => {
  const [page, setPage] = useState(2)
  const [accountInfo, setAccountInfo] = useState(null)

  const handleAccountInfoSubmit = (values: any) => {
    setAccountInfo(values)
    setPage(2)
  }

  if (page === 2) {
    return <BillingForm onClose={onClose} accountInfo={accountInfo} />
  }

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} centered>
      <ModalTitle>Sign up</ModalTitle>
      {page === 1 && <AccountForm onSubmit={handleAccountInfoSubmit} />}
      {/* {page === 2 && <BillingForm accountInfo={accountInfo} />} */}
    </Modal>
  )
}

export default SignupModal

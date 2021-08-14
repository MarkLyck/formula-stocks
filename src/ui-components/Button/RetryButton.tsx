import React from 'react'
import { Button } from 'antd'
import { ButtonIcon } from './ButtonIcon'

export const RetryButton = ({ children, ...props }: any) => {
  return (
    <Button icon={<ButtonIcon icon={['far', 'redo']} />} {...props}>
      {children ? children : 'Retry'}
    </Button>
  )
}

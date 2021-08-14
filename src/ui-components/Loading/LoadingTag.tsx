import React from 'react'
import { Tag } from 'src/ui-components/Tag'
import { LoadingIndicator } from './LoadingIndicator'
import theme from 'src/lib/theme'

export const LoadingTag = () => (
  <Tag color={theme.palette.text[500]} backgroundColor={theme.palette.neutral[300]}>
    loading <LoadingIndicator style={{ marginLeft: '8px' }} />
  </Tag>
)

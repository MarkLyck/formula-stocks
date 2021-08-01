import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'src/ui-components'

const DashboardButton = (props: any) => (
  <Button {...props}>
    <FontAwesomeIcon icon={['fad', 'analytics']} style={{ marginRight: 8, fontSize: 12, marginBottom: 2 }} />
    Dashboard
  </Button>
)

export default DashboardButton

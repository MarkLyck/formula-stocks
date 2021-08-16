import React from 'react'
import { Button } from 'src/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LogoutButton = (props: any) => (
  <Button {...props} appearance="ghost" status="danger" style={{ width: 120 }}>
    <FontAwesomeIcon icon={['fad', 'sign-out-alt']} style={{ marginRight: 8 }} />
    Log out
  </Button>
)

export default LogoutButton

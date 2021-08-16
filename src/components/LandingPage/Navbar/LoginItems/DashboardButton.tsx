import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'src/ui-components'

const StyledButton = styled(Button)`
  width: 130px;
  height: 44px;
  display: flex;
  justify-content: center;
  padding: 15px;
`

const DashboardButton = (props: any) => (
  <StyledButton {...props}>
    <FontAwesomeIcon icon={['fad', 'analytics']} style={{ marginRight: 8, fontSize: 12, marginBottom: 2 }} />
    Dashboard
  </StyledButton>
)

export default DashboardButton

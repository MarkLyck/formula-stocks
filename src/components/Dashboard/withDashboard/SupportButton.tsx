import React from 'react'
import { Button, ButtonIcon } from 'src/ui-components'
import { Tooltip } from 'antd'
// import useBreakpoint, { mediaQuery } from '@w11r/use-breakpoint'

import styled from '@emotion/styled'

const Container = styled.div`
  margin-top: auto;
  padding: 8px 16px;
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  padding: ${(p: any) => (p.collapsed ? '8px' : '8px 16px')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props: any) => props.theme.palette.neutral[100]};
  overflow: hidden;
  transition: all 0.2s;

  span {
    width: 100%;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
  }

  svg {
    margin-right: ${(p: any) => (p.collapsed ? '0' : '16px')};
    font-size: 16px;
    transition: all 0.2s;
  }
`

const handleClick = (_user: any) => {
  // @ts-ignore
  if (window.$crisp) {
    // @ts-ignore
    window.$crisp.push(['do', 'chat:show'])
    // @ts-ignore
    window.$crisp.push(['do', 'chat:open'])
  }
}

const SupportButton = ({ user, collapsed }: { user: any; collapsed: any }) => (
  <Tooltip placement="right" title="support">
    <Container>
      {/* @ts-ignore */}
      <StyledButton onClick={() => handleClick(user)} collapsed={collapsed}>
        <ButtonIcon icon="question-circle" />
        {!collapsed && <span>Support</span>}
      </StyledButton>
    </Container>
  </Tooltip>
)

export default SupportButton

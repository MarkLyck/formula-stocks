import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Button } from 'antd'
import { Title } from './styles'
const { Paragraph } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    margin: 16px 0;
    color: ${(p: any) => p.theme.palette.danger[600]};
    font-size: 64px;
  }
`
const Success = ({ onModalDismiss }: { onModalDismiss: () => void }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={['fas', 'frown']} />
      <Title>Your subscription is now cancelled</Title>
      <Paragraph>
        If you bought any of our signals, don't forget we publish our sell signals publicly, so you can always check
        back to our home page to see when we end up selling those stocks in the future.
      </Paragraph>
      <Paragraph>
        We know trust is very hard to earn in finance but we strongly believe we will continue to outperform the market
        in the long term. Please <b>set a reminder on your phone 1 year from now</b> to check back on our website and
        see how we performed since you canceled.
      </Paragraph>
      <Paragraph>From the team at Formula Stocks, we wish you good luck in your future investment endeavors!</Paragraph>
      <Button onClick={onModalDismiss}>Return to My Account</Button>
    </Container>
  )
}

export default Success

import React from 'react'
import styled from '@emotion/styled'
import { mediaQuery } from '@w11r/use-breakpoint'

import { LandingPageContainer } from 'src/ui-components'

const Title = styled.h2`
  text-align: center;
  color: ${(p) => p.theme.palette.text[300]};
  font-size: 1.6rem;
  margin-bottom: 16px;
`

const Exchange = styled.img`
  height: 80px;
  margin: 0 32px;
  padding: 16px;
  border-radius: 4px;
  &:hover {
    background-color: ${(p) => p.theme.palette.neutral[200]};
  }

  ${mediaQuery(['mobile-', 'width: 100%'])}
  ${mediaQuery(['mobile-', 'margin: 0'])}
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${mediaQuery(['mobile-', 'flex-direction: column'])}
`

const ExchangesSupported = () => (
  <LandingPageContainer align="center">
    <Title>Exchanges supported</Title>
    <Container>
      <Exchange src="/logos/exchanges/nyse.svg" />
      <Exchange src="/logos/exchanges/nasdaq.svg" />
      <Exchange src="/logos/exchanges/tsx.svg" />
    </Container>
  </LandingPageContainer>
)

export default ExchangesSupported

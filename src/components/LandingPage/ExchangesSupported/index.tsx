import React from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { mediaQuery } from '@w11r/use-breakpoint'

import { LandingPageContainer } from 'src/ui-components'

const Title = styled.h2`
  text-align: center;
  color: ${(p) => p.theme.palette.text[300]};
  font-size: 1.6rem;
  margin-bottom: 16px;
`

const ImageContainer = styled.div`
  height: 80px;
  border-radius: 4px;
  padding: 16px;
  margin: 0 32px;
  box-sizing: border-box;

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
      <ImageContainer>
        <Image width={46} height={48} src="/logos/exchanges/nyse.svg" alt="New York Stock Exchange" />
      </ImageContainer>
      <ImageContainer>
        <Image
          width={170}
          height={48}
          src="/logos/exchanges/nasdaq.svg"
          alt="National Association of Securities Dealers Automated Quotations"
        />
      </ImageContainer>
      <ImageContainer>
        <Image width={53} height={48} src="/logos/exchanges/tsx.svg" alt="Toronto Stock Exchange" />
      </ImageContainer>
    </Container>
  </LandingPageContainer>
)

export default ExchangesSupported

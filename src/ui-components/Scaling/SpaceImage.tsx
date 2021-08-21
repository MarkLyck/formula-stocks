import React from 'react'
// import Image from 'next/image'
import styled from '@emotion/styled'
import { mediaQuery } from '@w11r/use-breakpoint'

const Container = styled.div`
  img {
    height: 519px;
    width: auto;

    ${mediaQuery(['mobile-', 'height: auto;'])}
    ${mediaQuery(['mobile-', 'width: 100%;'])}
  }
`

export const SpaceImage = (args: any) => (
  <Container>
    <img width={657} height={519} {...args} />
  </Container>
)

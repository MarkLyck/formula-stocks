import React from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'

const Container = styled.div`
  img {
    min-width: 500px;
  }
`

export const SpaceImage = (args: any) => (
  <Container>
    <Image width={657} height={519} {...args} />
  </Container>
)

import styled from '@emotion/styled'

export const Beside = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1300px) {
    flex-direction: ${(p: any) => (p.reverse ? 'column-reverse' : 'column')};
  }
`

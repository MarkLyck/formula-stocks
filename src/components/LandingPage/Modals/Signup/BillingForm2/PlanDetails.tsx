import styled from '@emotion/styled'
import { useState } from 'react'
import { Typography, Divider } from 'antd'
import ScheduleToggle from 'src/components/LandingPage/Pricing/ScheduleToggle'
import Invoice from './Invoice'

const { Text } = Typography

const Container = styled.div`
  width: 50%;
  height: 400px;
  background: ${(p) => p.theme.palette.neutral[200]};
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PlanDetails = () => {
  const [term, setTerm] = useState('annually')

  return (
    <Container>
      <ScheduleContainer>
        <ScheduleToggle term={term} setTerm={setTerm} />
      </ScheduleContainer>
      <div>
        <Divider />
        <Invoice term={term} />
      </div>
    </Container>
  )
}

export default PlanDetails

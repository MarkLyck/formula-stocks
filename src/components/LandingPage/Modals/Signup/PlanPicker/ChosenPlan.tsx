import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title, Text } = Typography

const ChosenPlanContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  background: ${(p) => p.theme.palette.neutral[200]};
  padding: 12px;
  border: 2px solid ${(p) => p.theme.palette.border};
  margin-bottom: 24px;
`

const Beside = styled.div`
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  height: 40px;
  width: 40px;
  background-color: white;
  margin-right: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: ${(p) => p.theme.palette.neutral[100]};
  color: ${(p: any) => p.theme.palette[p.color][600]};
  box-shadow: 0 0px 5px rgba(18, 62, 138, 0.15);
`

type ChosenPlanProps = {
  plan: 'entry' | 'premium'
  schedule: 'monthly' | 'yearly'
}

const ScheduleText = styled(Text)`
  text-transform: capitalize;
  font-size: 12px;
`

const ChosenPlan = ({ plan, schedule }: ChosenPlanProps) => {
  const planTitle = plan === 'entry' ? 'Small portfolio' : 'Medium portfolio'
  return (
    <ChosenPlanContainer>
      <Beside>
        <IconContainer color={plan === 'entry' ? 'primary' : 'success'}>
          <FontAwesomeIcon icon={['fad', plan === 'entry' ? 'chart-line' : 'analytics']} />
        </IconContainer>

        <div>
          <Title level={5} style={{ marginBottom: 0, lineHeight: 1.2 }}>
            {planTitle}
          </Title>
          <ScheduleText>{schedule}</ScheduleText>
        </div>
      </Beside>
      {/* @ts-ignore */}
    </ChosenPlanContainer>
  )
}

export default ChosenPlan

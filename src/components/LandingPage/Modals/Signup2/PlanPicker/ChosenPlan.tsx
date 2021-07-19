import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title } = Typography

const ChosenPlanContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  background: ${(p) => p.theme.palette.neutral[200]};
  padding: 12px;
  border: 2px solid ${(p) => p.theme.palette.border};
  margin-bottom: 24px;
`

const Description = styled.p`
  font-size: 16px;
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

const ChosenPlan = ({ plan }: any) => {
  const planTitle = plan === 'entry' ? 'Starter' : 'Premium'
  return (
    <ChosenPlanContainer>
      <Beside>
        <IconContainer color="primary">
          <FontAwesomeIcon icon={['fad', 'chart-line']} />
        </IconContainer>

        <Title level={5} style={{ marginBottom: 0 }}>
          {planTitle}
        </Title>
      </Beside>
      {/* @ts-ignore */}
    </ChosenPlanContainer>
  )
}

export default ChosenPlan

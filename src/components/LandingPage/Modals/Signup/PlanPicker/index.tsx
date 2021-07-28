import styled from '@emotion/styled'
import { Typography } from 'antd'
import { ActionButton } from 'src/ui-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title } = Typography

const PlanContainer = styled.div`
  border-radius: 8px;
  width: 460px;
  background: ${(p) => p.theme.palette.neutral[200]};
  padding: 24px;
  border: 2px solid ${(p) => p.theme.palette.border};
`

const Description = styled.p`
  font-size: 16px;
`

const Beside = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  height: 52px;
  width: 52px;
  background-color: white;
  margin-right: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${(p) => p.theme.palette.neutral[100]};
  color: ${(p: any) => p.theme.palette[p.color][600]};
  box-shadow: 0 0px 5px rgba(18, 62, 138, 0.15);
`

const StyledList = styled.div`
  li {
    position: relative;
    padding-left: 16px;
    list-style: none;

    &::before {
      display: block;
      content: '';
      height: 8px;
      width: 8px;
      background: ${(p) => p.theme.palette[p.color][500]};
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-radius: 8px;
    }
  }
`

const PlanPicker = ({ setPlan }: any) => (
  <div>
    {/* <Description>Select the plan that best suits your needs</Description> */}
    <Beside>
      <PlanContainer style={{ marginRight: 16 }}>
        <Beside>
          <IconContainer color="primary">
            <FontAwesomeIcon icon={['fad', 'chart-line']} />
          </IconContainer>
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Small Portfolio
            </Title>
            <Description>$49 / month</Description>
          </div>
        </Beside>
        <StyledList color="neutral">
          <li>7-day free trial</li>
          <li>For portfolios under $100k</li>
        </StyledList>
        {/* @ts-ignore */}
        <ActionButton style={{ width: '100%', marginTop: 16 }} onClick={() => setPlan('entry')}>
          Choose plan
        </ActionButton>
      </PlanContainer>
      <PlanContainer>
        <Beside>
          <IconContainer color="success">
            <FontAwesomeIcon icon={['fad', 'analytics']} />
          </IconContainer>
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Medium Portfolio
            </Title>
            <Description>$99 / month</Description>
          </div>
        </Beside>
        <StyledList color="neutral">
          <li>7-day free trial</li>
          <li>For portfolios from $100k to $1M</li>
        </StyledList>
        {/* @ts-ignore */}
        <ActionButton status="success" style={{ width: '100%', marginTop: 16 }} onClick={() => setPlan('premium')}>
          Choose plan
        </ActionButton>
      </PlanContainer>
    </Beside>
  </div>
)

export default PlanPicker

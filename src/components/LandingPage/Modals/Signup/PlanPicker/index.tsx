import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mediaQuery } from '@w11r/use-breakpoint'

const { Title } = Typography

const PlanContainer = styled.div`
  border-radius: 8px;
  width: 460px;
  background: ${(p) => p.theme.palette.neutral[200]};
  padding: 24px;
  border: 2px solid ${(p) => p.theme.palette.border};

  ${mediaQuery(['mobile-', 'width: 100%'])}
  ${mediaQuery(['mobile-', 'margin-bottom: 24px'])}
`

const Description = styled.p`
  font-size: 16px;
`

const Header = styled.div`
  display: flex;
`

const Beside = styled.div`
  display: flex;
  ${mediaQuery(['mobile-', 'flex-direction: column'])}
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
      background: ${(p: any) => p.theme.palette[p.color][500]};
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-radius: 8px;
    }
  }
`

const GreenButton = styled(Button)`
  background-color: ${(p) => p.theme.palette.success[600]};
  border-color: ${(p) => p.theme.palette.success[700]};

  &:hover {
    background-color: ${(p) => p.theme.palette.success[500]};
    border-color: ${(p) => p.theme.palette.success[500]};
  }

  &:focus {
    background-color: ${(p) => p.theme.palette.success[500]};
    border-color: ${(p) => p.theme.palette.success[500]};
  }
`

const PlanPicker = ({ setPlan }: any) => (
  <div>
    {/* <Description>Select the plan that best suits your needs</Description> */}
    <Beside>
      <PlanContainer style={{ marginRight: 16 }}>
        <Header>
          <IconContainer color="primary">
            <FontAwesomeIcon icon={['fad', 'chart-line']} />
          </IconContainer>
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Small Portfolio
            </Title>
            <Description>$49 / month</Description>
          </div>
        </Header>
        <StyledList color="neutral">
          <li>7-day free trial</li>
          <li>For portfolios under $100k</li>
        </StyledList>
        {/* @ts-ignore */}
        <Button onClick={() => setPlan('entry')} type="primary" size="large" block style={{ marginTop: 16 }}>
          Choose plan
        </Button>
      </PlanContainer>
      <PlanContainer>
        <Header>
          <IconContainer color="success">
            <FontAwesomeIcon icon={['fad', 'analytics']} />
          </IconContainer>
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Medium Portfolio
            </Title>
            <Description>$99 / month</Description>
          </div>
        </Header>
        <StyledList color="neutral">
          <li>7-day free trial</li>
          <li>For portfolios from $100k to $1M</li>
        </StyledList>
        <GreenButton onClick={() => setPlan('premium')} type="primary" size="large" block style={{ marginTop: 16 }}>
          Choose plan
        </GreenButton>
      </PlanContainer>
    </Beside>
  </div>
)

export default PlanPicker

import { Radio, Typography, Badge, Button } from 'antd'
import ChosenPlan from '../PlanPicker/ChosenPlan'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'

const { Title, Text } = Typography

const ScheduleContainer = styled.div`
  border-radius: 8px;
  background: ${(p: any) => p.theme.palette.neutral[100]};
  padding: 20px;
  border: 2px solid ${(p: any) => (p.selected ? p.theme.palette.primary[600] : p.theme.palette.border)};
`

const Beside = styled.div`
  display: flex;
`

const FreeTrialText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 8px;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;

  svg {
    font-size: 18px;
    color: ${(p) => p.theme.palette.success[600]};
    margin-right: 8px;
  }
`

type SchedulePickerProps = {
  plan: string
  schedule: string
  setSchedule: (value: string) => void
  onSubmit: () => void
}

const SchedulePicker = ({ plan, schedule, setSchedule, onSubmit }: SchedulePickerProps) => {
  let yearlyPrice = 49
  let monthlyPrice = 59

  if (plan === 'premium') {
    yearlyPrice = 99
    monthlyPrice = 119
  }

  return (
    <div>
      <ChosenPlan plan={plan} schedule={schedule} />
      {/* @ts-ignore */}
      <Badge.Ribbon text="Save 20%">
        <ScheduleContainer
          // @ts-ignore
          selected={schedule === 'yearly'}
          onClick={() => setSchedule('yearly')}
          style={{ marginBottom: 16 }}
        >
          <Beside>
            <Radio checked={schedule === 'yearly'} style={{ marginTop: 4, marginRight: 16 }} />
            <div>
              <Title level={4} style={{ marginBottom: 0 }}>
                Yearly
              </Title>
              <Text>Pay for a full year - {currencyRoundedFormatter.format(yearlyPrice * 12)} / year</Text>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Title level={4} style={{ margin: '12px 0 0 auto' }}>
                ${yearlyPrice} / Mo
              </Title>
            </div>
          </Beside>
        </ScheduleContainer>
      </Badge.Ribbon>
      {/* @ts-ignore */}
      <ScheduleContainer selected={schedule === 'monthly'} onClick={() => setSchedule('monthly')}>
        <Beside>
          <Radio checked={schedule === 'monthly'} style={{ marginTop: 4, marginRight: 16 }} />
          <div>
            <Title level={4} style={{ marginBottom: 0 }}>
              Monthly
            </Title>
            <Text>Pay monthly, cancel anytime</Text>
          </div>
          <Title level={4} style={{ margin: '12px 0 0 auto' }}>
            ${monthlyPrice} / Mo
          </Title>
        </Beside>
      </ScheduleContainer>
      <FreeTrialText>
        <FontAwesomeIcon icon={['fad', 'gift']} />
        All plans include a 7-day free trial
      </FreeTrialText>
      <Button onClick={onSubmit} type="primary" block size="large">
        Next
      </Button>
    </div>
  )
}

export default SchedulePicker

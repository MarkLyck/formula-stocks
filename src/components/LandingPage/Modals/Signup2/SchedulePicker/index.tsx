import { Radio, Typography } from 'antd'
import ChosenPlan from '../PlanPicker/ChosenPlan'
import styled from '@emotion/styled'
import { ActionButton } from 'src/ui-components'

const { Title, Text } = Typography

const ScheduleContainer = styled.div`
  border-radius: 8px;
  background: ${(p) => p.theme.palette.neutral[100]};
  padding: 20px;
  border: 2px solid ${(p: any) => (p.selected ? p.theme.palette.primary[600] : p.theme.palette.border)};
`

const Beside = styled.div`
  display: flex;
`

type SchedulePickerProps = {
  plan: string
  schedule: string
  setSchedule: () => void
}

const SchedulePicker = ({ plan, schedule, setSchedule }: SchedulePickerProps) => {
  return (
    <div>
      <ChosenPlan plan={plan} />
      {/* @ts-ignore */}
      <ScheduleContainer
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
            <Text>Pay for a full year</Text>
          </div>
        </Beside>
      </ScheduleContainer>
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
        </Beside>
      </ScheduleContainer>
      <ActionButton style={{ width: '100%', marginTop: 16 }}>Next</ActionButton>
    </div>
  )
}

export default SchedulePicker

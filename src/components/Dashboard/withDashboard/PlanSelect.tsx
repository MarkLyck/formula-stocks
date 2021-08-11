import { Select } from 'antd'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import useStore from 'src/lib/useStore'
import { CURRENT_USER_QUERY } from 'src/common/queries'
const { Option } = Select

const Container = styled.div`
  margin: 16px 16px;
`

const PlanSelect = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const { plan, setPlan } = useStore((state: any) => ({ setPlan: state.setPlan, plan: state.plan }))

  const userRoles = data?.user?.roles.items || []
  const hasAdmin = userRoles.filter((role: any) => role.name === 'Administrator').length === 1

  if (!hasAdmin) return null

  return (
    <Container>
      <Select value={plan} onChange={setPlan} style={{ width: '100%' }}>
        <Option value="entry">Entry</Option>
        <Option value="premium">Premium</Option>
        <Option value="business">Business</Option>
        <Option value="fund">Fund</Option>
      </Select>
    </Container>
  )
}

export default PlanSelect

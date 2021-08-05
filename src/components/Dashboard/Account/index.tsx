import { useQuery, useMutation } from '@apollo/client'
import { Row, Col } from 'antd'
import useBreakpoint from '@w11r/use-breakpoint'

import { CURRENT_USER_QUERY, USER_UPDATE } from 'src/common/queries'
import AccountHeader from './Header'
import ManageSubscription from './ManageSubscription'
import Statistics from './Statistics'
import UpdatePaymentDetails from './UpdatePaymentDetails'

const Account = () => {
  const { data, loading: userLoading } = useQuery(CURRENT_USER_QUERY)
  const [updateUser] = useMutation(USER_UPDATE)
  const { 'isTablet-': isTabletMinus } = useBreakpoint()

  const user = data?.user
  console.log('🔈 ~ user', user)

  const colSpan = isTabletMinus ? 24 : 12

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <AccountHeader user={user} />
        {/* <DashboardHeader title="My Account" showExchangeStatuses={false} /> */}
      </Col>
      <Col span={24}>
        <Statistics />
      </Col>
      <Col span={colSpan}>
        <UpdatePaymentDetails customerID={user?.stripe?.customerID} />
      </Col>
      <Col span={colSpan}>
        <ManageSubscription
          userLoading={userLoading}
          subscription={user?.stripe?.subscription}
          updateUser={updateUser}
          user={user}
        />
      </Col>
    </Row>
  )
}

export default Account

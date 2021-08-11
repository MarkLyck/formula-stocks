import { Row, Col } from 'antd'
import { DashboardHeader } from 'src/ui-components'
import UsersTable from './UsersTable'

const GUTTER_SIZE = 24

const Admin = () => {
  return (
    <>
      <Row gutter={GUTTER_SIZE}>
        <Col span={24}>
          <DashboardHeader />
        </Col>
      </Row>
      <Row gutter={GUTTER_SIZE}>
        <Col span={24}>
          <UsersTable />
        </Col>
      </Row>
    </>
  )
}

export default Admin

import React from 'react'
import { Row, Col } from 'antd'

import { PortfolioChart, DashboardHeader, PermissionWrapper } from 'src/ui-components'
import Statistics from 'src/components/Dashboard/Account/Statistics'
import Holdings from './Holdings'
import Allocation from './Allocation'
import WelcomeGuide from './WelcomeGuide'

const GUTTER_SIZE = 24

const Portfolio = () => (
  <>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <DashboardHeader />
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <Statistics />
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <WelcomeGuide />
      </Col>
    </Row>
    <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]} style={{ marginBottom: GUTTER_SIZE }}>
      <Col span={24}>
        <PortfolioChart />
      </Col>
    </Row>
    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <PermissionWrapper>
          <Holdings />
        </PermissionWrapper>
      </Col>
    </Row>

    <Row gutter={GUTTER_SIZE}>
      <Col span={24}>
        <PermissionWrapper ErrorComponent={null}>
          <Allocation />
        </PermissionWrapper>
      </Col>
    </Row>
  </>
)

export default Portfolio

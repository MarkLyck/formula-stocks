import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Col, Spin } from 'antd'
import useBreakpoint from '@w11r/use-breakpoint'
import useStore from 'src/lib/useStore'

import { TRADES_QUERY, LATEST_TRADE } from 'src/common/queries'
import { LoadingError, DashboardHeader, PermissionWrapper } from 'src/ui-components'
import Trade from './Trade'
import TradesGuide from './TradesGuide'

const Trades = ({ fromDate }: any) => {
  const plan = useStore((state: any) => state.plan)
  const { 'isTablet-': isTabletMinus } = useBreakpoint()

  const { data, loading, error } = useQuery(TRADES_QUERY, {
    variables: {
      planName: plan,
      fromDate,
    },
  })

  if (loading) return <Spin />
  if (error) return <LoadingError error={error} />

  let colSpan = 8
  if (isTabletMinus) {
    colSpan = 24
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <DashboardHeader />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <TradesGuide />
        </Col>
      </Row>
      <Row gutter={16}>
        <PermissionWrapper>
          {data?.signalsList.items.map((trade: any) => (
            <Trade trade={trade} key={trade.ticker + trade.action} colSpan={colSpan} />
          ))}
        </PermissionWrapper>
      </Row>
    </>
  )
}

const TradesWrapper = (props: any) => {
  const { data, loading, error } = useQuery(LATEST_TRADE)

  if (loading) return <Spin />
  if (error) return <LoadingError error={error} />

  return <Trades {...props} fromDate={data?.signalsList?.items ? data.signalsList.items[0].date : undefined} />
}

export default TradesWrapper

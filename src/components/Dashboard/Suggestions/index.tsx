import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Col, Spin } from 'antd'
import useBreakpoint from '@w11r/use-breakpoint'
import useStore from 'src/lib/useStore'
import { SUGGESTIONS_QUERY, LATEST_SUGGESTION } from 'src/common/queries'
import { LoadingError, DashboardHeader, PermissionWrapper } from 'src/ui-components'
import Suggestion from './Suggestion'
import SuggestionsGuide from './SuggestionsGuide'

const Suggestions = ({ fromDate }: any) => {
  const { 'isTablet-': isTabletMinus } = useBreakpoint()
  const plan = useStore((state: any) => state.plan)

  const { data, error } = useQuery(SUGGESTIONS_QUERY, {
    variables: {
      planName: plan,
      fromDate,
    },
  })

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
          <SuggestionsGuide />
        </Col>
      </Row>
      <Row gutter={16}>
        <PermissionWrapper>
          {data?.signalsList.items.map((trade: any) => (
            <Suggestion trade={trade} key={trade.ticker + trade.action} colSpan={colSpan} />
          ))}
        </PermissionWrapper>
      </Row>
    </>
  )
}

const SuggestionsWrapper = (props: any) => {
  const { data, loading, error } = useQuery(LATEST_SUGGESTION)

  if (loading) return <Spin />
  if (error) return <LoadingError error={error} />

  return <Suggestions {...props} fromDate={data?.signalsList?.items ? data.signalsList.items[0].date : undefined} />
}

export default SuggestionsWrapper

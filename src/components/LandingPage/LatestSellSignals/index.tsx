import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Table } from 'antd'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { maxSiteWidth } from 'src/common/styles'
import { LAST_10_TRADES } from 'src/common/queries'
import { ScalingTitle, ScalingSubTitle, ActionPill, StockReturn, ActionButton } from 'src/ui-components'
import { PastTradesModal } from '../Modals'

const LatestSellsContainer = styled.div`
  ${maxSiteWidth};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 4rem;

  @media (max-width: 500px) {
    margin-top: 24px;
  }
`

const StyledTable = styled(Table)`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${(p) => p.theme.palette.border}, 0 4px 14px 0 rgba(111, 120, 156, 0.08);
`

const columns = [
  {
    title: 'Trade',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <ActionPill ticker={name} action="SELL" />,
  },
  {
    title: 'First purchase',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Duration',
    dataIndex: 'daysHeld',
    key: 'daysHeld',
    render: (value: number) => `${value} days`,
  },
  {
    title: 'Avg. buy price',
    dataIndex: 'buyPrice',
    key: 'buyPrice',
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    title: 'Sold at',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    title: 'Return',
    dataIndex: 'percentIncrease',
    key: 'percentIncrease',
    fixed: 'right',
    width: 100,
    render: (value: number) => <StockReturn percentReturn={value} />,
  },
]

const LatestSellSignals = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { loading, data } = useQuery(LAST_10_TRADES, { variables: { planName: 'entry' } })

  const latestSells = data ? data.tradeHistoriesList.items : []

  return (
    <LatestSellsContainer>
      <PastTradesModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <ScalingTitle>Latest sell signals</ScalingTitle>
      <ScalingSubTitle style={{ marginBottom: 40 }}>
        Here's our 10 latest sell signals (updated monthly)
      </ScalingSubTitle>
      <StyledTable
        rowKey="name"
        dataSource={latestSells}
        loading={loading}
        // @ts-ignore
        columns={columns}
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
      {/* @ts-ignore */}
      <ActionButton onClick={() => setModalVisible(true)} style={{ marginTop: 32 }}>
        <FontAwesomeIcon icon={['fad', 'history']} style={{ marginRight: 8 }} />
        SEE ALL HISTORICAL TRADES
      </ActionButton>
    </LatestSellsContainer>
  )
}

export default LatestSellSignals

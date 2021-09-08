import React from 'react'
import dayjs from 'dayjs'
import { Typography, Spin } from 'antd'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { minBy } from 'lodash'

const { Text } = Typography

const TinyArea = dynamic(() => import('@ant-design/charts').then((mod) => mod.TinyArea) as any, { ssr: false })

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const TooltipContent = styled.div`
  padding: 4px;
`

const TooltipText = styled(Text)`
  font-size: 14px;
  margin: 0;
`

const getIndexForTradeDate = (trade: any, data: any[]) => {
  if (!trade) return null

  let tradeIndex = null
  data.some((point: any, i) => {
    if (point.close === trade.price) {
      tradeIndex = i
    }
    if (point.date === trade.date && point.close === trade.price) {
      tradeIndex = i
      return true
    }
  })

  return tradeIndex
}

export const TinyStockChart = ({ data, trade, loading, height = 60 }: any) => {
  const theme = useTheme()
  if (loading) {
    return (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )
  }
  if (!Array.isArray(data) || data.length === 0) return null

  const tradeIndex = getIndexForTradeDate(trade, data)

  const annotations = []
  if (tradeIndex !== null) {
    annotations.push({
      type: 'dataMarker',
      position: [tradeIndex, trade?.price],
      text: {
        content: `${trade.action}`,
        style: {
          fill: theme.palette.primary[600],
          textAlign: 'center',
          fontSize: 8,
        },
      },
      line: { length: 4 },
      point: {
        style: {
          fill: theme.palette.primary[600],
        },
      },
      autoAdjust: false,
    })
  }

  var config = {
    height,
    autoFit: true,
    tooltip: {
      customContent: (_: string, points: [any]) => {
        const value = points[0]?.value
        return (
          <TooltipContent>
            <TooltipText>${value ? Number(value).toFixed(2) : ''}</TooltipText>
          </TooltipContent>
        )
      },
    },
    yAxis: {
      minLimit: Math.floor(minBy(data, (point: any) => point.close).close),
    },
    annotations,
    data: data.map((point) => point.close),
    smooth: false,
  }

  // @ts-ignore
  return <TinyArea {...config} />
}

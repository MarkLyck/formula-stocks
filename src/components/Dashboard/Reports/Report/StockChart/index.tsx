import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Card, Space } from 'antd'
import dynamic from 'next/dynamic'
import { cloneDeep } from 'lodash'
import { useTheme } from '@emotion/react'
import { minBy } from 'lodash'
import dayjs from 'dayjs'
import qs from 'query-string'

import { FMP } from 'src/common/queries'
import { currencyFormatter } from 'src/common/utils/formatters'
import IntervalSelector from './IntervalSelector'
import ChartSelector from './ChartSelector'
import DateRangeSelector from './DateRangeSelector'
import { stockChartTooltip, lineChartTooltip } from './Tooltip'

const Stock = dynamic(() => import('@ant-design/charts').then((mod) => mod.Stock) as any, { ssr: false })
const Area = dynamic(() => import('@ant-design/charts').then((mod) => mod.Area) as any, { ssr: false })

type StockChartProps = {
  symbol: string
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [dateRange, setDateRange] = useState({
    from: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD'),
    value: '1-month',
  })

  const [interval, setInterval] = useState('daily')
  const [chartType, setChartType] = useState('line')
  const theme = useTheme()

  const dateQuery = {
    from: dateRange.from,
    to: dateRange.to,
  }

  const { loading, data } = useQuery(FMP, {
    variables: {
      endpoint:
        interval === 'daily'
          ? `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?${qs.stringify(dateQuery)}`
          : `https://financialmodelingprep.com/api/v3/historical-chart/${interval}/${symbol}?${qs.stringify(
              dateQuery
            )}`,
    },
  })

  let priceHistory = []
  if (Array.isArray(data?.FMP?.response)) {
    priceHistory = data.FMP.response.slice().reverse()
  } else if (Array.isArray(data?.FMP?.response?.historical)) {
    priceHistory = data.FMP.response.historical.slice().reverse()
  }

  const min: any = minBy(priceHistory, 'close')
  const chartData = cloneDeep(priceHistory)

  const stockConfig = {
    loading,
    width: 400,
    height: 500,
    data: chartData,
    legend: false,
    xField: 'date',
    yField: ['close', 'open', 'high', 'low'],
    yAxis: {
      label: {
        labelLine: null,
        formatter: (v: number) => `${currencyFormatter.format(v)}`,
        style: {
          fill: '#A0A5B2',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#EFF4F7',
            lineWidth: 1,
          },
        },
      },
    },
    xAxis: { tickCount: 10 },
    tooltip: {
      customContent: (title: string, items: any[]) => stockChartTooltip(title, items, theme),
    },
    slider: {
      start: 0,
      end: 1,
    },
  }

  const areaConfig = {
    loading,
    width: 400,
    height: 500,
    data: chartData,
    legend: false,
    xField: 'date',
    yField: 'close',
    yAxis: {
      min: min?.close,
      minLimit: min?.close,
      label: {
        labelLine: null,
        formatter: (v: number) => `${currencyFormatter.format(v)}`,
        style: {
          fill: '#A0A5B2',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#EDF1F7',
            lineWidth: 1,
          },
        },
      },
    },
    xAxis: { tickCount: 10 },
    areaStyle: function areaStyle() {
      return { fill: 'l(270) 0:#ffffff 0.5:#adcaff 1:#5c8aff' }
    },
    tooltip: {
      customContent: (title: string, items: any[]) => lineChartTooltip(title, items),
    },
  }

  return (
    <Card
      title="Price chart"
      extra={
        <Space>
          <IntervalSelector interval={interval} setInterval={setInterval} />
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} setInterval={setInterval} />
          <ChartSelector interval={interval} chartType={chartType} setChartType={setChartType} />
        </Space>
      }
    >
      {/* @ts-ignore */}
      {chartType === 'line' ? <Area {...areaConfig} /> : <Stock {...stockConfig} />}
    </Card>
  )
}

export default StockChart

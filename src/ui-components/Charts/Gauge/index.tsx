// import React from 'react'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
// import styled from '@emotion/styled'
// import { maxBy } from 'lodash'
// import { format } from 'date-fns'
// import { numberFormatter, decimalNumberFormatter } from 'src/common/utils/formatters'
// import { useTheme } from '@emotion/react'

// const Line = dynamic(() => import('@ant-design/charts').then((mod) => mod.Line) as any, { ssr: false })
const Gauge = dynamic(() => import('@ant-design/charts').then((mod) => mod.Gauge) as any, { ssr: false })

const AIScoreText = styled.span`
  font-weight: bold;
`

const Normalizer = (min: number, max: number) => ({
  normalize: (x: number) => min + x * (max - min),
  denormalize: (x: number) => (x + max) / (max - min),
})

const gaugeNormalizer = Normalizer(-100, 100)

const GaugeChart = ({ value, color }: any) => {
  const score = value * 100
  const config = {
    percent: gaugeNormalizer.denormalize(score),
    height: 300,
    padding: 12,
    range: {
      color: color,
      width: 12,
    },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    axis: {
      label: {
        formatter: (text: string) => {
          const num = gaugeNormalizer.normalize(+text)
          return `${num > 0 ? `+${num}` : num}`
        },
      },
      subTickLine: { count: 3 },
    },
    statistic: {
      content: {
        formatter: () => `${value > 0 ? `+${score.toFixed(2)}` : score.toFixed(2)}`,
        style: {
          color: color,
          fontSize: 32,
          fontWeight: 'bold',
        },
      },
    },
    gaugeStyle: {
      lineCap: 'round',
    },
  }

  // @ts-ignore
  return <Gauge {...config} />
}

export default GaugeChart

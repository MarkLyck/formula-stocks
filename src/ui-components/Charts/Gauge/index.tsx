import dynamic from 'next/dynamic'
const Gauge = dynamic(() => import('@ant-design/charts').then((mod) => mod.Gauge) as any, { ssr: false })

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

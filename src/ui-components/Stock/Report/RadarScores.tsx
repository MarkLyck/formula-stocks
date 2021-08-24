import { useState } from 'react'
import styled from '@emotion/styled'
import { Divider, Radio, Card } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AIScorePreview } from 'src/ui-components'

import { getAIScoreColor } from 'src/common/utils/reportUtils'
import { RadarChart } from 'src/ui-components/Charts'

const RaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  .radar-chart {
    width: 100%;
    padding: 24px;
  }
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const AIScoreCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
  .ant-card-extra {
    padding: 0;
  }
`

const RadarScores = ({ scores }: any) => {
  const [view, setView] = useState('chart')

  const radarChartData = [
    { label: 'Growth', value: scores.ai_growth * 100 + 100 },
    { label: 'Value', value: scores.ai_value * 100 + 100 },
    { label: 'Profitability', value: scores.ai_profitability * 100 + 100 },
    { label: 'Soundness', value: scores.ai_soundness * 100 + 100 },
    { label: 'Stewardship', value: scores.ai_stewardship * 100 + 100 },
    { label: 'Safety', value: scores.ai_safety * 100 + 100 },
    { label: 'Reward', value: scores.ai_reward * 100 + 100 },
  ]

  return (
    <AIScoreCard
      title="Strengths & Weaknesses"
      extra={
        <Radio.Group onChange={(e: any) => setView(e.target.value)} defaultValue="chart">
          <Radio.Button value="chart">
            <FontAwesomeIcon icon={['fad', 'hexagon']} />
          </Radio.Button>
          <Radio.Button value="sliders">
            <FontAwesomeIcon icon={['fad', 'sliders-h']} />
          </Radio.Button>
        </Radio.Group>
      }
    >
      <RaderContainer>
        {view === 'chart' && <RadarChart data={radarChartData} color={getAIScoreColor(scores.ai_score * 100)} />}
        {view === 'sliders' && (
          <SliderContainer>
            <AIScorePreview score={scores.ai_value} label="Value" />
            <Divider />
            <AIScorePreview score={scores.ai_profitability} label="Profitability" />
            <Divider />
            <AIScorePreview score={scores.ai_growth} label="Growth" />
            <Divider />
            <AIScorePreview score={scores.ai_soundness} label="Soundness" />
            <Divider />
            <AIScorePreview score={scores.ai_stewardship} label="Stewardship" />
          </SliderContainer>
        )}
      </RaderContainer>
    </AIScoreCard>
  )
}

export default RadarScores

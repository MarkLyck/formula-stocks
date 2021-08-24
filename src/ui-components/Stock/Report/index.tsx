// @ts-nocheck
import React from 'react'
import styled from '@emotion/styled'
import { Card, Divider, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AIScore from './AIScore'
import { ScoreList, BesideSection, BoldValue } from './styles'
import { HorizontalScore, Gauge } from 'src/ui-components/Charts'
import { AIScorePreview, AIScoreReturn } from 'src/ui-components'
import { AIScoreTag } from 'src/ui-components/AIScore'
import { getAIScoreColor } from 'src/common/utils/reportUtils'
import RadarScores from './RadarScores'

const ChartContainer = styled(Card)`
  width: 100%;
  height: 406px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 100%;
  }
`

const AIScoreCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
`

const ReportContainer = styled.div`
  display: flex;
  width: 100%;

  > div:nth-of-type(1) {
    margin-right: 32px;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    > div:nth-of-type(1) {
      margin-right: 0;
    }
  }

  @media (max-width: 600px) {
    padding-right: 0;
  }
`

const ReportPartContainer = styled.div`
  width: calc(50% - 16px);

  .ant-divider {
    margin: 16px 0;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`

const SectionHeader = styled.h3`
  font-weight: 500;
  color: ${(p: any) => p.theme.palette.neutral[1000]};
  margin-bottom: 8px;
  margin-top: 24px;
  margin-left: 2px;
  &:first-of-type {
    margin-top: 8px;
  }
`

const LargeAIScoreTag = styled(AIScoreTag)`
  font-weight: bold;
  padding: 6px 12px;
  text-transform: uppercase;
`

// const tips: { [key: string]: string } = {
//   Reward: 'Higher values, indicates better odds for a higher future return (alpha).',
//   Safety: "Higher values, indicates better odds for a positive future return. Inverse of 'risk'",
//   Growth: 'Higher values indicate better capacity for growth',
//   Value:
//     'Higher values indicate better value. Value is the relationship between what you pay and what you get in return.',
//   Profitability: 'Higher values indicate a more profitable business model',
//   Soundness: 'Higher values indicates the degree to which the business appears to be sound.',
//   Stewardship:
//     'Higher values indicates the extent with which management actions appear aligned with shareholder interests.',
// }

export interface ReportType {
  scores: {
    ai_score: number
    ai_reward: number
    ai_safety: number
    ai_growth: number
    ai_value: number
    ai_profitability: number
    ai_soundness: number
    ai_stewardship: number
  }
  price: number
  ticker: string
}

const Report = ({ price, scores, ticker }: ReportType) => {
  return (
    <>
      <ReportContainer>
        <ReportPartContainer>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <AIScoreCard
              title={
                <>
                  <FontAwesomeIcon icon={['fad', 'tachometer-alt']} style={{ marginRight: 8 }} />
                  AI Score
                </>
              }
              extra={<LargeAIScoreTag score={scores.ai_score * 100} />}
            >
              <Gauge value={scores.ai_score} color={getAIScoreColor(scores.ai_score * 100)} />
            </AIScoreCard>
            <AIScoreCard>
              <AIScorePreview score={scores.ai_reward} label="Reward" />
              <Divider />
              <AIScorePreview score={scores.ai_safety} label="Safety" />
              <Divider />
              <AIScoreReturn score={scores.ai_score} />
            </AIScoreCard>
          </Space>
        </ReportPartContainer>

        <ReportPartContainer>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <RadarScores scores={scores} />
          </Space>
        </ReportPartContainer>
      </ReportContainer>
    </>
  )
}

export default Report

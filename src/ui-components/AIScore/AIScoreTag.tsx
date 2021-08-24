import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { getAIScoreColor, getAIScoreSentiment } from 'src/common/utils/reportUtils'

const Tag = styled.span`
  color: white;
  background: ${(p: any) => transparentize(0.2, p.color)};
  border: 1px solid ${(p) => p.color};
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  text-align: right;
  font-weight: 400;
`

type AIScoreTagProps = {
  score: number
}

export const AIScoreTag = ({ score, ...props }: AIScoreTagProps) => {
  return (
    <Tag color={getAIScoreColor(score)} {...props}>
      {getAIScoreSentiment(score)}
    </Tag>
  )
}

import { Row } from 'antd'
import { ActionPill } from 'src/ui-components'

type TradeHeaderProps = { action: 'BUY' | 'SELL'; ticker: string; price?: number }

const ExampleTradeHeader = ({ action, ticker }: TradeHeaderProps) => (
  <Row justify="space-between" align="middle">
    <ActionPill action={action} ticker={ticker} />
  </Row>
)

export default ExampleTradeHeader

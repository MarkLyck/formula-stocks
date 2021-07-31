import { Typography, Row, Col } from 'antd'
import styled from '@emotion/styled'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'

const { Text } = Typography

const Beside = styled.div`
  display: flex;
  justify-content: space-between;
`

const Bold = styled(Text)`
  font-weight: bold;
`

type InvoiceProps = {
  plan: 'entry' | 'premium'
  schedule: 'monthly' | 'yearly'
}

const Invoice = ({ plan, schedule }: InvoiceProps) => {
  let price = 59
  if (plan === 'entry' && schedule === 'yearly') price = 49 * 12

  if (plan === 'premium' && schedule === 'monthly') {
    price = 119
  } else if (plan === 'premium' && schedule === 'yearly') {
    price = 99 * 12
  }

  const termText = schedule === 'monthly' ? 'Month' : 'Year'

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Beside>
            <Text>Price after 7 days:</Text>
            <Bold>
              {currencyRoundedFormatter.format(price)} / {termText}
            </Bold>
          </Beside>
        </Col>
      </Row>
    </>
  )
}

export default Invoice

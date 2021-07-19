import { Typography, Row, Col } from 'antd'
import styled from '@emotion/styled'

const { Text } = Typography

const Beside = styled.div`
  display: flex;
  justify-content: space-between;
`

const Bold = styled(Text)`
  font-weight: bold;
`
const Capitalize = styled.span`
  font-style: capitalize;
`

type InvoiceProps = {
  term: string
}

const Invoice = ({ term }: InvoiceProps) => {
  let price = 59
  if (term === 'annually') price = 49 * 12

  const termText = term === 'monthly' ? 'Month' : 'Year'

  return (
    <div style={{ marginTop: 'auto' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Beside>
            <Text>Due now:</Text>
            <Bold>$0</Bold>
          </Beside>
        </Col>
        <Col span={24}>
          <Beside>
            <Text>Due in 7 days:</Text>
            <Bold>
              ${price} / {termText}
            </Bold>
          </Beside>
        </Col>
      </Row>
    </div>
  )
}

export default Invoice

import { Typography, Row, Col } from 'antd'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import coupons from './coupons'

const { Text } = Typography

const CouponContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  border-radius: 4px;
  background: ${(p) => p.theme.palette.success[200]};
  color: ${(p) => p.theme.palette.success[700]};
  font-weight: bold;
  margin-bottom: 8px;
`

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
  couponCode: any
}

const Invoice = ({ plan, schedule, couponCode }: InvoiceProps) => {
  let price = 59
  let couponPrice = 59
  let couponText = ''
  let couponApplied = false
  if (plan === 'entry' && schedule === 'yearly') price = 49 * 12

  if (plan === 'premium' && schedule === 'monthly') {
    price = 119
  } else if (plan === 'premium' && schedule === 'yearly') {
    price = 99 * 12
  }

  // @ts-ignore
  if (coupons[couponCode]) {
    // @ts-ignore
    const coupon = coupons[couponCode]
    couponApplied = true
    couponPrice = price * coupon.priceMultiplier
    couponText = coupon.text
  }

  const termText = schedule === 'monthly' ? 'Month' : 'Year'

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          {couponApplied ? (
            <>
              <CouponContainer>
                <FontAwesomeIcon icon={['fad', 'tags']} style={{ marginRight: 8 }} />
                Coupon applied: {couponText}
              </CouponContainer>
              <Beside>
                <Text>Price after 7 days:</Text>
                <Bold>
                  {currencyRoundedFormatter.format(couponPrice)} / {termText}
                </Bold>
              </Beside>
              <Beside>
                <Text>Price after coupon expires:</Text>
                <Bold>
                  {currencyRoundedFormatter.format(price)} / {termText}
                </Bold>
              </Beside>
            </>
          ) : (
            <Beside>
              <Text>Price after 7 days:</Text>
              <Bold>
                {currencyRoundedFormatter.format(price)} / {termText}
              </Bold>
            </Beside>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Invoice

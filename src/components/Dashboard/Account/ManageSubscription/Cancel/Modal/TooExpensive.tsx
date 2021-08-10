import React, { useState } from 'react'
import { Typography, Button, Space } from 'antd'
import ReturnsCalculator from 'src/components//LandingPage/Modals/ReturnsCalculator'
import { Title, Bold } from './styles'
import { CancelPagePropsType } from './types'

const { Paragraph } = Typography

const TooExpensive = ({ onCancel, cancelLoading, onApplyDiscount, applyCouponLoading }: CancelPagePropsType) => {
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const percentDiscount = 50
  const discountedPrice = 29
  const discountedMonths = 3

  return (
    <div>
      <Title>Formula Stocks should pay for itself.</Title>
      <Paragraph>
        Our goal is that the returns' gained from following Formula Stocks over time, should more than pay for the cost
        of the service in the long-run.
      </Paragraph>
      <Paragraph>
        however we are very aware that our service requires a long-term use and mindset to properly function and our
        historical results didn't happen overnight.
      </Paragraph>
      <Paragraph>
        If we can help you by cutting <Bold>{percentDiscount}% of the price</Bold> every month for the next{' '}
        <Bold>{discountedMonths} months</Bold>, would you give Formula Stocks a chance?
      </Paragraph>
      <ReturnsCalculator isVisible={calculatorVisible} onClose={() => setCalculatorVisible(false)} />
      <Paragraph>
        Just click "Yes" and we'll take care of the details and make sure you keep getting uninterrupted access to our
        service at the cheaper rate. After {discountedMonths} months, your subscription will continue at the normal
        rate.
      </Paragraph>
      <Space direction="vertical">
        <Button type="primary" onClick={onApplyDiscount} loading={applyCouponLoading}>
          Yes, I'll stay for the discounted price at ${discountedPrice} / month for {discountedMonths} months
        </Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          No I'll pass, cancel my subscription
        </Button>
      </Space>
    </div>
  )
}

export default TooExpensive

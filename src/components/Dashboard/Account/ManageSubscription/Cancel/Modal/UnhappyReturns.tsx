import React from 'react'
import { differenceInDays } from 'date-fns'
import { Typography, Button, Space } from 'antd'
import { useQuery } from '@apollo/client'

import { STATISTICS } from 'src/common/queries'
import { Bold } from './styles'
import { CancelPagePropsType } from './types'

const { Paragraph, Title } = Typography

const UnhappyReturns = ({
  user,
  onCancel,
  cancelLoading,
  onApplyDiscount,
  applyCouponLoading,
}: CancelPagePropsType) => {
  const { data } = useQuery(STATISTICS)
  const percentDiscount = 50
  const discountedPrice = 29
  const discountedMonths = 3

  const daysUserSubscribed = differenceInDays(new Date(), new Date(user.createdAt))
  const timeText =
    daysUserSubscribed < 14 ? `${daysUserSubscribed} days` : `${Math.floor(daysUserSubscribed / 7)} weeks`

  const statistics = data?.statisticsList?.items[0] || {}

  return (
    <div>
      <Title level={4}>We're sorry to hear you didn't see the returns you were expecting!</Title>
      <Paragraph>
        Formula Stocks is a long-term investment strategy that has managed a historical compounded annual growth rate
        of: <Bold>+{statistics?.cAGR}%</Bold>, vastly outperforming the stock market's 6-8% growth rate.
      </Paragraph>
      <Paragraph>
        This is of course an average recorded over a period of many years, it is not a constant or guaranteed daily
        growth. There are periods the system will underperform and there are periods the system will overperform on
        these results. Our goal is that Formula Stocks should outperform the general market and competing hedgefunds in
        the long run at a competitive price.
      </Paragraph>
      <Paragraph>
        It looks like you have only been subscribed to Formula Stocks for <Bold>{timeText}</Bold>. We believe this
        period is simply too short to draw any conclusions on our long-term strategy.
      </Paragraph>
      <Paragraph>
        We highly recommend our users who wants to try out the system to stay at least until there has been 10
        round-trip trades to judge. But we completely understand it is not encouring to pay for a system that has not
        met your expectations thus far. So if it helps we would like to offer you a {percentDiscount}% discount for the
        next {discountedMonths} months!
      </Paragraph>
      <Paragraph>
        Simply click the "Yes" button below, and we'll give you a{' '}
        <Bold>
          {percentDiscount}% discount for the next {discountedMonths} months.
        </Bold>{' '}
        allowing you to see how the system performs over a longer period at a much lower price.
      </Paragraph>

      <Space direction="vertical">
        <Button type="primary" onClick={onApplyDiscount} loading={applyCouponLoading}>
          Yes, I'll stay for the discounted price at ${discountedPrice} / month for {discountedMonths} months
        </Button>
        <Button type="primary" danger onClick={onCancel} loading={cancelLoading}>
          No I'll pass, cancel my subscription anyway
        </Button>
      </Space>
    </div>
  )
}

export default UnhappyReturns

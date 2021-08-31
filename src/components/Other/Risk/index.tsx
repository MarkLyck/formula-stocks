import React from 'react'
import styled from '@emotion/styled'
import { Typography, Card, Spin, Tabs } from 'antd'
import { useQuery } from '@apollo/client'

import Navbar from '../../LandingPage/Navbar'
import { StockReturn } from 'src/ui-components'
import { STATISTICS, BACKTESTED_PERFORMANCE_HISTORY, MARKET_PRICE_HISTORY } from 'src/common/queries'
import { Disclaimer } from 'src/ui-components'
import BacktestedChart from 'src/components/LandingPage/Performance/BacktestedChart'
import { COMPANY_NAME } from 'src/common/constants'
import Recessions from './Recessions'
import TimeInvestedChart from './TimeInvestedChart'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs

const RiskContainer = styled.div`
  background: ${(props) => props.theme.palette.neutral[200]};
  box-sizing: border-box;
  padding-bottom: 32px;
`

const Content = styled(Card)`
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 32px;
  margin-bottom: 32px;

  background: white;
`
const StyledCard = styled(Card)`
  border-radius: 8px;
  margin: 16px 0;

  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
`
const ListItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.palette.neutral[200]};
  font-size: 16px;
  span:first-of-type {
    font-weight: 500;
    color: ${(props) => props.theme.palette.neutral[700]};
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Risk = () => {
  const { data, loading } = useQuery(STATISTICS)
  const { data: planData, loading: planLoading, error: planError } = useQuery(BACKTESTED_PERFORMANCE_HISTORY, {
    variables: {
      plan: 'entry',
    },
  })
  const { data: marketData } = useQuery(MARKET_PRICE_HISTORY, {
    variables: {
      marketType: 'SP500',
      fromDate: '1970-01-30',
    },
  })

  if (loading) return <Spin />

  const statistics = data?.statisticsList?.items[0] || {}
  const { winLossRatio = 90, averageGainPerPosition = 60, averageLossPerPosition = 20 } = statistics

  const winRatio = winLossRatio.toFixed(2)
  const lossRatio = (100 - winLossRatio).toFixed(2)

  const backtestedHistory = planData?.plan?.backtestedHistory || []
  const marketHistory = marketData?.marketPricingHistoriesList?.items || []

  const averageGainRounded = Number(averageGainPerPosition.toFixed(2))
  const averageLossRounded = Number(-averageLossPerPosition.toFixed(2))

  const expectedReturn =
    (winLossRatio / 100) * averageGainPerPosition - ((100 - winLossRatio) / 100) * averageLossPerPosition

  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <RiskContainer>
        <Content>
          <Title>Risk & Reward</Title>
          <Paragraph>
            A superb investment strategy display an asymmetric relationship between risk and reward, with reward being
            larger than risk:
          </Paragraph>
          <StyledCard>
            <ListItem>
              <span>Average return of the {winRatio}% winning trades:</span>{' '}
              <StockReturn percentReturn={averageGainRounded} />
            </ListItem>
            <ListItem>
              <span>Average loss of the {lossRatio}% losing trades:</span>{' '}
              <StockReturn percentReturn={averageLossRounded} />
            </ListItem>
          </StyledCard>
          <Paragraph>
            {COMPANY_NAME} win {winRatio}% of the time. Based on 50 years of data we can calculate a mathematical
            expectation of ({(winRatio / 100).toFixed(2)} * {averageGainRounded}) - (
            {((100 - winLossRatio) / 100).toFixed(2)} * {averageLossRounded}) = +{expectedReturn.toFixed(2)}%. Taking an
            average of 2.2 years per trade we get an expected annualized return of {(expectedReturn / 2.2).toFixed(2)}%.
          </Paragraph>
          <Paragraph>The reward is very well defined up to this date. The future may deviate.</Paragraph>
          <Paragraph>
            All investments carry some degree of risk. Lets have a closer look at risk associated with investing within
            our universe.
          </Paragraph>
          <Title level={4}>Diversification</Title>
          <Paragraph>
            Any single investment can result in a loss, but having a larger basket of Formula stocks, held over a longer
            period will reduce odds of a net loss. Indeed, in the past a diversified longer term portfolio would have
            been a very safe and very rewarding portfolio.<sup>*</sup>
          </Paragraph>
          <Paragraph>
            For that reason, one should always be diversified in order to reduce the risk of any one single event
            impacting a portfolio in a very significant manner.
          </Paragraph>
          <Disclaimer style={{ marginBottom: 32 }}>
            <sup>*</sup>Past returns does not guarantee future results
          </Disclaimer>
          <Title level={4}>Facts instead of emotion</Title>
          <Paragraph>The biggest risk factor is always the human factor.</Paragraph>
          <Paragraph>
            {COMPANY_NAME} uses unbiased logic that looks for wonderful growing businesses to invest in. Unlike
            algorithms however, humans have to deal with emotions like fear, greed, uncertainty and impatience.
          </Paragraph>
          <Paragraph>
            Controlling emotions is key. If you cannot control emotions, you are much more likely to lose money or miss
            out. For example if you had invested $25,000 using {COMPANY_NAME} back in December 1972 just before the
            downturn, and had sold in fear when the stock market went down -10%, -20%, or -40% in value, you would then
            have ended up with a loss. Whereas if you used {COMPANY_NAME} and let the system do it's thing, it would
            instead have turned $25,000 into millions over a longer period of time, by utilizing the opportunities
            afforded by the very same stock market correction.
          </Paragraph>
          <Paragraph>
            The same goes for greed. Many of the businesses {COMPANY_NAME} have invested in over time, have had
            tremendous returns. But if you get greedy and sell too fast, or too fearful that a stock will drop soon and
            sell because of such fear, you are likely to underperform.
          </Paragraph>
          <Paragraph>
            {COMPANY_NAME} have had down years in the past, and it's likely to have down years in the future. If you
            cannot control your fear, greed and impatience, you may well lose money. On the flip side of this, if you
            can manage your emotions, the sky is the limit.
          </Paragraph>
          <Title level={4}>How does {COMPANY_NAME} typically handle a stock market correction?</Title>
          <Paragraph>
            Corrections are seen from time to time in the markets. Below is a table of larger stock market corrections
            and how {COMPANY_NAME} typically responds to said situation. It shows how big each drawdown was in every
            major correction/recession since 1970 for both {COMPANY_NAME} and the S&P500. You can also see how many
            months it took to {COMPANY_NAME} and the S&P500 to fully recover from these drawdowns (reach their previous
            high).
          </Paragraph>
          <Recessions />
          <Paragraph style={{ marginTop: 32 }}>
            While {COMPANY_NAME} is not immune to stock market crashes (like any trading system), it has managed to
            recover effectively from the crashes much faster than the general market.
          </Paragraph>
          <Paragraph>
            {COMPANY_NAME} doubled in value during the Dot-com bubble. Since most of the over-hyped internet companies
            that crashed in the early 2000s, were very far from the stocks which we would invest in, our portfolio at
            the time went up instead of down.
          </Paragraph>
          <Paragraph>
            {COMPANY_NAME} generally corrects along with the broader market, but it should be observed that a downturn
            immediately increases future returns of the strategy. During a downturn or "price reset", {COMPANY_NAME}
            will be able to find much better buying opportunities. Many stocks bought during downturns ends up being the
            biggest winners in the years following. Investments made during drawdowns are largely why {COMPANY_NAME} is
            able to recover so quickly. The seed for future success is often found in a correction.
          </Paragraph>
          <Paragraph>
            Explore the logarithmic chart below to see how each recession impacted the portfolio. You can compare
            {COMPANY_NAME} vs. the S&P500
          </Paragraph>
          <BacktestedChart
            name={COMPANY_NAME}
            marketName="S&P 500"
            isLoading={planLoading}
            error={planError}
            planPerformance={backtestedHistory}
            marketPrices={marketHistory}
            log={true}
          />

          <Title level={4} style={{ marginTop: 32 }}>
            Using {COMPANY_NAME} as intended.
          </Title>
          <Paragraph>
            {COMPANY_NAME} is not about getting rich quick. Consequently, you should not expect that as an outcome
            within a few weeks.
          </Paragraph>
          <Paragraph>
            If you were to use {COMPANY_NAME} for a very brief period of time, it would be the equivalent of not
            diversifying your portfolio. You would expose yourself more to chance, than if you were using it for a
            longer period.
          </Paragraph>
          <Paragraph>
            Lets have a look at how this works. In the chart below the red periods indicate the historical probability
            of losing money with Formula Stock picks, under various different time frames. Hold one month, and you
            statistically speaking have a ~70% probability of a net profit. conversely ~30% for a net loss. Hold 3
            years, and a ~97% statistical probability of a net profit, and only a ~3% probability of a net loss. All 5
            year periods with {COMPANY_NAME} has been profitable without exception. Note these are historical numbers,
            future returns may deviate.
          </Paragraph>
          <Tabs defaultActiveKey="1">
            <TabPane tab={COMPANY_NAME} key="1">
              <TimeInvestedChart
                // @ts-ignore
                data={backtestedHistory}
                title="The longer you invest, the lower the risk of losing money"
              />
            </TabPane>
            <TabPane tab="S&P 500" key="2">
              {/* @ts-ignore */}
              <TimeInvestedChart data={marketHistory} title="S&P500 have more losing periods across the board" />
            </TabPane>
          </Tabs>

          <Paragraph style={{ marginTop: 32 }}>
            Summing it all. It is important to diversify both in terms of number of stocks, but also in terms of time.
            It is also important to let rationale and not emotion guide you. Do this, and risk is significantly reduced.
          </Paragraph>
        </Content>
      </RiskContainer>
    </>
  )
}

export default Risk

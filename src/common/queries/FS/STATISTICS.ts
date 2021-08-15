import { gql } from '@apollo/client'

export const STATISTICS = gql`
  query STATISTICS($planName: String) {
    statisticsList(filter: { plan: { planID: { equals: $planName } } }) {
      items {
        gainToPainRatio
        winLossRatio
        totalReturn
        sortinoRatio
        sharpeRatio
        roundtripTradesPerYear
        positionsSoldWithProfit
        positionsSoldWithLoss
        maxDrawdown45Years
        maxDrawdown36Months
        iRRGeometricMean
        iRRArithmeticMean
        formulasUsed
        cAGR
        cALMARRatio3Year
        averageNumberOfPositionsInPortfolio
        averageLossPerPosition
        averageHoldingPeriod
        averageGainPerPosition
      }
    }
  }
`

export const STATISTICS_SINCE_LAUNCH = gql`
  query STATISTICS($planName: String) {
    statisticsSinceLaunchesList(filter: { plan: { planID: { equals: $planName } } }) {
      items {
        totalReturn
        winLossRatio
        cAGR
        positionsSoldWithProfit
        positionsSoldWithLoss
      }
    }
  }
`

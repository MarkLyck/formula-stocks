import { gql } from '@apollo/client'

export const LATEST_TRADE = gql`
  query LATEST_TRADE_QUERY($planName: String) {
    signalsList(last: 1, filter: { plan: { planID: { equals: $planName } }, type: { equals: "trade" } }) {
      items {
        date
      }
    }
  }
`

export const TRADES_QUERY = gql`
  query TRADES_QUERY($planName: String, $fromDate: Date) {
    signalsList(
      filter: { date: { gte: $fromDate }, plan: { planID: { equals: $planName } }, type: { equals: "trade" } }
    ) {
      items {
        ticker
        action
        percentageWeight
        portfolioWeight
        price
        totalPortfolioWeight
        type
        boughtAt
        date
        report {
          aIScore
        }
        stock_v2 {
          stockPrices {
            latestPrice
          }
          profile {
            image
            companyName
          }
        }
      }
    }
  }
`

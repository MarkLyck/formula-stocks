import { gql } from '@apollo/client'

export const LATEST_SUGGESTION = gql`
  query LATEST_LATEST_SUGGESTION_QUERY($planName: String) {
    signalsList(last: 1, filter: { plan: { planID: { equals: $planName } }, type: { equals: "suggestion" } }) {
      items {
        date
      }
    }
  }
`

export const SUGGESTIONS_QUERY = gql`
  query SUGGESTIONS_QUERY($planName: String, $fromDate: Date) {
    signalsList(
      filter: { date: { gte: $fromDate }, plan: { planID: { equals: $planName } }, type: { equals: "suggestion" } }
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

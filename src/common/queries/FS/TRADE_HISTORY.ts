import { gql } from '@apollo/client'

export const TRADE_HISTORY = gql`
  query TRADE_HISTORY($planName: String) {
    tradeHistoriesList(filter: { plan: { planID: { equals: $planName } } }) {
      items {
        symbol
        name
        obfuscatedSymbol
        buyPrice
        sellPrice
        percentIncrease
        startDate
        endDate
        daysHeld
      }
    }
  }
`

export const LAST_10_TRADES = gql`
  query TRADE_HISTORY($planName: String) {
    tradeHistoriesList(sort: { endDate: DESC }, first: 10, filter: { plan: { planID: { equals: $planName } } }) {
      items {
        symbol
        name
        obfuscatedSymbol
        buyPrice
        sellPrice
        percentIncrease
        startDate
        endDate
        daysHeld
      }
    }
  }
`

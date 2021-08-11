import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
  query USERS {
    usersList {
      items {
        country
        email
        lastName
        firstName
        lastSeen
        plan
        stripe {
          subscription
        }
        createdAt
        cancelReason
        billingPeriod
        type
      }
    }
  }
`

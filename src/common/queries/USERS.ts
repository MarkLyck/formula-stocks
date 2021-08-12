import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
  query USERS {
    usersList(filter: { is8base: { not_equals: true } }) {
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

export const ACTIVE_USERS_QUERY = gql`
  query ACTIVE_USERS {
    usersList(
      filter: {
        roles: { none: { name: { equals: "Administrator" } }, every: {}, some: { name: { equals: "Subscriber" } } }
      }
    ) {
      items {
        email
      }
    }
  }
`

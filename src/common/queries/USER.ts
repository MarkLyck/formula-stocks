import { gql } from '@apollo/client'

import { AUTH_PROFILE_ID } from 'src/common/constants'

export const USER_SIGNUP = gql`
  mutation userSignUpWithPassword(
    $email: String!
    $plan: String!
    $billingPeriod: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $coupon: String
    $country: String
    $stripeToken: JSON!
  ) {
    userSignUpWithPassword(
      authProfileId: "${AUTH_PROFILE_ID}"
      password: $password
      user: {
        email: $email
        plan: $plan
        billingPeriod: $billingPeriod
        firstName: $firstName
        lastName: $lastName
        country: $country
        coupon: $coupon
        stripe: { create: { token: $stripeToken } }
      }
    ) {
      id
    }
  }
`

// export const USER_SIGNUP_MANUAL = gql`
//   mutation userSignUpWithPassword(
//     $email: String!
//     $password: String!
//   ) {
//     userSignUpWithPassword(
//       authProfileId: "${AUTH_PROFILE_ID}"
//       password: $password
//       user: {
//         email: $email
//       }
//     ) {
//       id
//     }
//   }
// `

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(data: { email: $email, password: $password, authProfileId: "${AUTH_PROFILE_ID}" }) {
      success
      auth {
        idToken
        refreshToken
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      createdAt
      email
      lastName
      firstName
      tutorials
      type
      phoneNumber
      roles {
        items {
          name
          id
        }
      }
      stripe {
        subscription
        customer
        customerID
      }
    }
  }
`

export const USER_LAST_SEEN = gql`
  mutation userUpdate($id: ID!, $lastSeen: DateTime) {
    userUpdate(data: { id: $id, lastSeen: $lastSeen }) {
      id
    }
  }
`

export const USER_UPDATE = gql`
  mutation userUpdate($id: ID!, $cancelReason: String) {
    userUpdate(data: { id: $id, cancelReason: $cancelReason }) {
      id
      email
      cancelReason
    }
  }
`

export const USER_UPDATE_PHONE_NUMBER = gql`
  mutation userUpdate($id: ID!, $phoneNumber: String) {
    userUpdate(data: { id: $id, phoneNumber: $phoneNumber }) {
      id
      phoneNumber
    }
  }
`

export const SET_TUTORIALS = gql`
  mutation userUpdate($id: ID!, $tutorials: JSON) {
    userUpdate(data: { id: $id, tutorials: $tutorials }) {
      id
      tutorials
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation userRefreshToken($email: String, $refreshToken: String!, $authProfileId: ID) {
    userRefreshToken(data: { email: $email, refreshToken: $refreshToken, authProfileId: $authProfileId }) {
      idToken
      refreshToken
    }
  }
`

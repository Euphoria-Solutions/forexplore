import { gql } from '@apollo/client';

export const GET_PLAN_CALENDAR_QUERY = gql`
  query GetTradePlanCallenderData(
    $forexAccount: String!
    $startDate: String
    $endDate: String
  ) {
    getTradePlanCallenderData(
      forexAccount: $forexAccount
      startDate: $startDate
      endDate: $endDate
    ) {
      date
      plans {
        instrument
        lot
        status
        type
        _id
        mentalStatement
      }
      notes {
        date
        description
        _id
      }
    }
  }
`;

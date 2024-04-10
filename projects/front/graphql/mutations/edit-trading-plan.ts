import { gql } from '@apollo/client';

export const EDIT_TRADING_PLAN_MUTATION = gql`
  mutation DeleteTradePlan($id: String!, $title: String!) {
    editTradePlan(_id: $id, title: $title)
  }
`;

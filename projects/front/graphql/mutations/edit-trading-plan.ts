import { gql } from '@apollo/client';

export const EDIT_TRADING_PLAN_MUTATION = gql`
  mutation EditTradePlan($id: String!, $title: String, $order: Float) {
    editTradePlan(_id: $id, title: $title, order: $order)
  }
`;

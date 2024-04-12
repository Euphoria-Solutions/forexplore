import { gql } from '@apollo/client';

export const CHANGE_TRADING_PLAN_ORDERS_MUTATION = gql`
  mutation ChangeTradePlansOrder($orders: [String]) {
    changeTradePlansOrder(orders: $orders)
  }
`;

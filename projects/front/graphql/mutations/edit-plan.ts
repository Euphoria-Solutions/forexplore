import { gql } from '@apollo/client';

export const EDIT_PLAN_MUTATION = gql`
  mutation EditPlan($plans: [PlanInput]!) {
    editPlan(plans: $plans)
  }
`;

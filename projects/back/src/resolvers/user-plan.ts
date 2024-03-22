import {
  MutationCreateUserPlanArgs,
  MutationDeleteUserPlanArgs,
  MutationEditUserPlanArgs,
  QueryGetPlansArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { UserPlanModel } from '../models';

export const createUserPlan = async (
  _: ResolversParentTypes,
  params: MutationCreateUserPlanArgs
) => {
  try {
    const plan = new UserPlanModel(params);

    await plan.save();

    return plan;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editUserPlan = async (
  _: ResolversParentTypes,
  params: MutationEditUserPlanArgs
) => {
  try {
    await UserPlanModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getUserPlans = async (
  _: ResolversParentTypes,
  params: QueryGetPlansArgs
) => {
  try {
    const plans = await UserPlanModel.find(params);

    return plans;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteUserPlan = async (
  _: ResolversParentTypes,
  params: MutationDeleteUserPlanArgs
) => {
  try {
    await UserPlanModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

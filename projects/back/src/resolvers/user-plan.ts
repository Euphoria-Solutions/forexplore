import {
  MutationCreatePlanArgs,
  MutationDeletePlanArgs,
  MutationEditPlanArgs,
  QueryGetPlansArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { UserPlanModel } from '../models';

export const createPlan = async (
  _: ResolversParentTypes,
  params: MutationCreatePlanArgs
) => {
  try {
    const plan = new UserPlanModel(params);

    await plan.save();

    return plan;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editPlan = async (
  _: ResolversParentTypes,
  params: MutationEditPlanArgs
) => {
  try {
    await UserPlanModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getPlans = async (
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

export const deletePlan = async (
  _: ResolversParentTypes,
  params: MutationDeletePlanArgs
) => {
  try {
    await UserPlanModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

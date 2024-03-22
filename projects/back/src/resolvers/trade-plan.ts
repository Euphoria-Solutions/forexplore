import {
  MutationAddPlanArgs,
  MutationCreateTradePlanArgs,
  MutationDeleteTradePlanArgs,
  MutationDeleteUserPlanArgs,
  MutationEditPlanArgs,
  MutationEditTradePlanArgs,
  MutationLinkPlanToTradeArgs,
  QueryGetTradePlansArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { PlanModel, TradeModel, TradePlanModel } from '../models';

export const createTradePlan = async (
  _: ResolversParentTypes,
  params: MutationCreateTradePlanArgs
) => {
  try {
    const tradePlan = new TradePlanModel(params);

    await tradePlan.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editTradePlan = async (
  _: ResolversParentTypes,
  params: MutationEditTradePlanArgs
) => {
  try {
    await TradePlanModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteTradePlan = async (
  _: ResolversParentTypes,
  params: MutationDeleteTradePlanArgs
) => {
  try {
    await TradePlanModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getTradePlans = async (
  _: ResolversParentTypes,
  params: QueryGetTradePlansArgs
) => {
  try {
    const tradePlans = await TradePlanModel.find(params);

    const totalTradePlans = await Promise.all(
      tradePlans.map(async tradePlan => {
        const plans = await PlanModel.find({ tradePlan: tradePlan._id });
        return {
          _id: tradePlan._id,
          title: tradePlan.title,
          plans: plans,
        };
      })
    );

    return totalTradePlans;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const addPlan = async (
  _: ResolversParentTypes,
  params: MutationAddPlanArgs
) => {
  try {
    const plan = new PlanModel(params);

    await plan.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editPlan = async (
  _: ResolversParentTypes,
  params: MutationEditPlanArgs
) => {
  try {
    await Promise.all(
      (params.plans ?? []).map(async plan => {
        await PlanModel.updateOne({ _id: plan._id }, { $set: plan });
      })
    );

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deletePlan = async (
  _: ResolversParentTypes,
  params: MutationDeleteUserPlanArgs
) => {
  try {
    await PlanModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const linkPlanToTrade = async (
  _: ResolversParentTypes,
  params: MutationLinkPlanToTradeArgs
) => {
  try {
    await TradeModel.findByIdAndUpdate(params.tradeId, { plan: params.planId });

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

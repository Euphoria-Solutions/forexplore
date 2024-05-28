import {
  MutationAddNoteArgs,
  MutationAddTradingPlanArgs,
  MutationDeleteTradePlanArgs,
  MutationEditNoteArgs,
  MutationEditTradePlanArgs,
  MutationFinishTradePlanArgs,
  MutationRemoveNoteArgs,
  QueryGetTradePlanCallenderDataArgs,
  ResolversParentTypes,
  TradePlanDetails,
} from '../generated/generated';
import { isDateInRange } from '../helper';
import { NoteModel, TradePlanModel } from '../models';

export const addTradingPlan = async (
  _: ResolversParentTypes,
  params: MutationAddTradingPlanArgs
) => {
  try {
    const date = new Date();
    const tradePlan = new TradePlanModel({
      ...params,
      createdAt: date.toISOString(),
      status: 'ongoing',
    });

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

export const getTradePlanCallenderData = async (
  _: ResolversParentTypes,
  params: QueryGetTradePlanCallenderDataArgs
) => {
  try {
    const tradePlans = await TradePlanModel.find({
      forexAccount: params.forexAccount,
    });

    const notes = await NoteModel.find({
      forexAccount: params.forexAccount,
    });

    const res: TradePlanDetails[] = [];

    tradePlans.forEach(plan => {
      const date = isDateInRange(
        plan.createdAt,
        params.startDate || null,
        params.endDate || null
      );

      if (date) {
        const index = res.findIndex(element => element.date === date);
        if (index == -1) {
          res.push({
            date: date,
            plans: [plan],
            notes: [],
          });
        } else {
          res[index] = {
            ...res[index],
            plans: [...res[index].plans, plan],
          };
        }
      }
    });

    notes.forEach(note => {
      const date = isDateInRange(
        note.date,
        params.startDate || null,
        params.endDate || null
      );

      if (date) {
        const index = res.findIndex(element => element.date === date);
        if (index == -1) {
          res.push({
            date: date,
            plans: [],
            notes: [note],
          });
        } else {
          res[index] = {
            ...res[index],
            notes: [...res[index].notes, note],
          };
        }
      }
    });

    return res;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const finishTradePlan = async (
  _: ResolversParentTypes,
  params: MutationFinishTradePlanArgs
) => {
  try {
    await TradePlanModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const addNote = async (
  _: ResolversParentTypes,
  params: MutationAddNoteArgs
) => {
  try {
    const date = new Date();
    const note = new NoteModel({
      ...params,
      date: date.toISOString(),
    });

    await note.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editNote = async (
  _: ResolversParentTypes,
  params: MutationEditNoteArgs
) => {
  try {
    await NoteModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const removeNote = async (
  _: ResolversParentTypes,
  params: MutationRemoveNoteArgs
) => {
  try {
    await NoteModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

import {
  MutationBlockUserArgs,
  QueryGetUsersArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { UserModel } from '../models';

export const getUsers = async (
  _: ResolversParentTypes,
  params: QueryGetUsersArgs
) => {
  try {
    return await UserModel.find(params);
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const blockUser = async (
  _: ResolversParentTypes,
  params: MutationBlockUserArgs
) => {
  try {
    await UserModel.findByIdAndUpdate(params._id, {
      blocked: true,
    });

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

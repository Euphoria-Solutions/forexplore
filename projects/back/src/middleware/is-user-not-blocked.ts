import jwt from 'jsonwebtoken';
import { rule } from 'graphql-shield';
import { UserModel } from '../models';

const secretKey = process.env.JWT_KEY ?? '';

export const isUserNotBlocked = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx
) => {
  try {
    const userParams = jwt.verify(ctx.headers.token, secretKey);
    if (typeof userParams === 'string') return false;

    const user = await UserModel.findById(userParams._id);

    return !user.blocked;
  } catch (err) {
    return 'User blocked';
  }
});

import jwt from 'jsonwebtoken';
import { rule } from 'graphql-shield';

const secretKey = process.env.JWT_KEY ?? '';

export const isUserHasToken = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx
) => {
  try {
    const user = jwt.verify(ctx.headers.token, secretKey);

    if (typeof user === 'string') return false;
    if (!user.email) return false;

    return true;
  } catch (err) {
    return 'User has no permission to access';
  }
});

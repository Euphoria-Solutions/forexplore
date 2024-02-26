import jwt from 'jsonwebtoken';
import { rule } from 'graphql-shield';

const secretKey = process.env.JWT_KEY ?? '';

export const isEmailVerified = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx
) => {
  try {
    const user = jwt.verify(ctx.headers.token, secretKey);

    if (typeof user === 'string') return false;
    if (!user.emailVerified) return false;

    return true;
  } catch (err) {
    return 'Email not verified';
  }
});

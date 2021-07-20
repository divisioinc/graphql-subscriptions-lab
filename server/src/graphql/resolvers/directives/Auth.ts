import { AuthenticationError } from "apollo-server-errors";

export default (next, src, args, context) => {
  const authorizationToken = !!context.headers.authorization;

  if (!authorizationToken) {
    throw new AuthenticationError("You must be logged in");
  }

  return next();
};

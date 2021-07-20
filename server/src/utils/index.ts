import { AuthenticationError } from "apollo-server-errors";
import { sign, verify } from "jsonwebtoken";

import config from "../config";

export function getUserId(authHeader) {
  const token = authHeader.replace("Bearer ", "");

  if (!token) throw new AuthenticationError("Invalid token");

  const tokenPayload = verify(token, config.jwt.secret);

  if (!tokenPayload) throw new AuthenticationError("Invalid token");

  const { id } = JSON.parse(tokenPayload.sub);

  return id;
}

export const generateUserToken = async (id) => {
  const { secret, expiresIn } = config.jwt;

  return sign({}, secret, {
    subject: JSON.stringify({ id }),
    expiresIn,
  });
};

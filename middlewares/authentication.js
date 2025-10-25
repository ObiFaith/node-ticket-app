import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized.js";

export const AuthenticatedUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer"))
    throw new UnauthorizedError("Unauthorized Access!");

  // get token
  const token = authorization.split(" ")[1];
  try {
    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // create req.user
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthorizedError("Access denied. Please log in again.");
  }
};

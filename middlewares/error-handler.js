import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors/custom-error.js";

export const ErrorHandler = (err, req, res, next) => {
  let { message } = err;

  let statusCode =
    err instanceof CustomApiError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(err => err.message);
    message = errors.join(", ");

    if (!(err instanceof CustomApiError)) statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(statusCode).json({ status: "error", message });
};

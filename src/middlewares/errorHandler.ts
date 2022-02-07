import { ErrorRequestHandler } from "express";
import CustomAPIError from "../errors/CustomAPIError";
import { StatusCodes } from "http-status-codes";

const errorHandler: ErrorRequestHandler = (
  error: CustomAPIError,
  _,
  res,
  __
) => {
  let CustomError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong, try again later",
  };

  if (CustomError.message === "Invalid URL") {
    CustomError.message = "invalid url";
    CustomError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res
    .status(CustomError.statusCode)
    .json({ error: CustomError.message });
};

export default errorHandler;

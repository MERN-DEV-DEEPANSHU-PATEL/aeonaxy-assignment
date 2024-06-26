import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
class ValidationError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
class InternalServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
class UnAuthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnauthenticatedError,
  InternalServerError,
  UnAuthorizedError,
};

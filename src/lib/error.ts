import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
	public type: string;
  public code: number;
  public data: any;

	constructor(message: string, code: number, data?: any) {
		super(message);
		this.type = "BaseError";
    this.code = code;
		this.data = data;
	}
}

export class NotFoundError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.NOT_FOUND, data);
		this.type = "NotFound";
	}
}

export class BadRequestError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.BAD_REQUEST, data);
		this.type = "BadRequest";
	}
}

export class ForbiddenError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.FORBIDDEN, data);
		this.type = "ForbiddenError";
	}
}

export class UnauthorizedError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.UNAUTHORIZED, data);
		this.type = "UnauthorizedError";
	}
}

export class UnprocessableEntityError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.UNPROCESSABLE_ENTITY, data);
		this.type = "UnprocessableEntityError";
	}
}

export class ConflictError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.CONFLICT, data);
		this.type = "ConflictError";
	}
}

export class InternalError extends BaseError {
	constructor(message: string, data?: any) {
		super(message, StatusCodes.INTERNAL_SERVER_ERROR, data);
		this.type = "ConflictError";
	}
}

export class InvalidTokenError extends BaseError {
  constructor(message: string, data?: any) {
    super(message, StatusCodes.UNAUTHORIZED, data);
    this.type = "InvalidToken";
  }
}

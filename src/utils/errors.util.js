export class ApplicationError extends Error {
    constructor(message, code, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code || 'ERR_INTERNAL_SERVER'
        this.message = message || 'Something went wrong. Please try again.';
        this.status = status || 500;
    }
}

export class UnauthorizeError extends ApplicationError {
    constructor(message) {
        super(message || 'No auth token provided', 'ERR_UNAUTHORIZED', 401);
    }
}

export class AuthTokenExpiredError extends ApplicationError {
    constructor(message) {
        super(message || 'Auth token expired', 'ERR_AUTH_TOKEN_EXPIRED', 401);
    }
}

export class ValidationError extends ApplicationError {
    constructor(message) {
        super(message || 'Validation Failed', 'ERR_VALIDATION', 400);
    }
}

export class CannotApproveError extends ApplicationError {
    constructor(message) {
        super(message || 'Cannot approve a payment that has already been cancelled', 'ERR_CANNOT_APPROVE', 400);
    }
}

export class CannotCancelError extends ApplicationError {
    constructor(message) {
        super(message || 'Cannot cancel a payment that has already been approved', 'ERR_CANNOT_CANCEL', 400);
    }
}
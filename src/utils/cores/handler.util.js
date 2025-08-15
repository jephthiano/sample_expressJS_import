import { ValidationError, CustomApiException } from '#core_util/errors.util.js';

const getEnvorThrow = (key) => {
    const val = process.env[key];
    if (!val) triggerError("Error occurred on the server", [], 500);
    
    return val;
}

const NODE_ENV = getEnvorThrow('NODE_ENV');
/**
 * Send a standardized JSON response.
 */
function sendResponse(res, data = {}, message = "OK", status = true, error = [], statusCode = 200) {
  return res.status(statusCode).json({
    status,
    message,
    response_data: data,
    error_data:   error,
  });
}

/**
 * Centralized exception handler.  
 * ValidationError, DB errors, and CustomApiException.
 */
function handleException(res, error) {

  // for validation error
  if (error instanceof ValidationError) {
    return sendResponse(res, {}, error.message, false, error.errors, 422);
  }

  // for database error
  if (error.name === "SequelizeDatabaseError" || error.name === "MongoError") {
    const errorData = NODE_ENV === "development"
                        ? { stack: error.stack, message: error?.message ?? null }
                        : [];
    return sendResponse(res, {}, "Something went wrong", false, errorData, 500);
  }

  // for custome error
  if (error instanceof CustomApiException) {
    return sendResponse(res, {}, error.message, false, error.details, error.status);
  }

  // fallback
  const errorData = NODE_ENV === "development"
                      ? { message: error.message, stack: error.stack }
                      : [];
  return sendResponse(res, {}, "Something went wrong", false, errorData, 500);
}

/**
 * Throw a generic API exception (default 403).
 */
function triggerError(message, details = [], statusCode = 403) {
  throw new CustomApiException(message, statusCode, details);
}

/**
 * Throw a validation exception (422).
 */
function triggerValidationError(details = []) {
  throw new ValidationError(details);
}

function returnNotFound(res, message='Not Found') {
  sendResponse(res, {}, message, false, 404);
}

export {
  sendResponse,
  handleException,
  triggerError,
  triggerValidationError,
  returnNotFound,
};
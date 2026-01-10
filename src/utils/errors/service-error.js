const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {
  constructor(
    message = 'something went wrong',
    explanation = ' service layer error',
    statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  ){
      super();
      this.name = 'ServiceError',
      this.message = message,
      this.explanation = explanation,
      this.statusCode = statusCodes
  }
}

module.exports = ServiceError;
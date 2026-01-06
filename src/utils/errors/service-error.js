const { StatusCodes } = require('http-status-codes');

class ServiceError extends error {
  constructor(
    message = 'something went wrong',
    explainantion = ' service layer error',
    statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  ){
      super();
      this.name = 'ServiceError',
      this.message = message,
      this.explainantion = explainantion,
      this.statusCodes = statusCodes
  }
}

module.exports = ServiceError;
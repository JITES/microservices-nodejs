class ErrorHandler {
  constructor(status, msg) {
    this.status = status;
    this.message = msg;
  }

  static NotFound(message = 'Error not found') {
    return new ErrorHandler(404, message);
  }
}

module.exports = ErrorHandler;

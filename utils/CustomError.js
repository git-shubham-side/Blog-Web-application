class CustomError extends Error {
  super(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;

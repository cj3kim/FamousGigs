function ServerError(code, error) {
    Error.call(this, error.message);
    //Error.captureStackTrace(this, this.constructor);
    this.name = "ServerError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = code;
    this.status = 501;
    this.inner = error;
}

ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

module.exports = ServerError;

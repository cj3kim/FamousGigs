function AccountAlreadyExists(code, error) {
    Error.call(this, error.message);
    //Error.captureStackTrace(this, this.constructor);
    this.name = "AccountAlreadyExists";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = code;
    this.status = 403;
    this.inner = error;
}

AccountAlreadyExists.prototype = Object.create(Error.prototype);
AccountAlreadyExists.prototype.constructor = AccountAlreadyExists;

module.exports = AccountAlreadyExists;

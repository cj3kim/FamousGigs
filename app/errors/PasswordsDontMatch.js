function PasswordsDontMatch(code, error) {
    Error.call(this, error.message);
    //Error.captureStackTrace(this, this.constructor);
    this.name = "PasswordsDontMatch";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = code;
    this.status = 403;
    this.inner = error;
}

PasswordsDontMatch.prototype = Object.create(Error.prototype);
PasswordsDontMatch.prototype.constructor = PasswordsDontMatch;

module.exports = PasswordsDontMatch;

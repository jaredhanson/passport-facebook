/**
 * `FacebookGraphAPIError` error.
 *
 * References:
 *   - https://developers.facebook.com/docs/reference/api/errors/
 *
 * @constructor
 * @param {String} [message]
 * @param {String} [type]
 * @param {Number} [code]
 * @param {Number} [subcode]
 * @api public
 */
function FacebookGraphAPIError(message, type, code, subcode) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'FacebookGraphAPIError';
  this.message = message;
  this.type = type;
  this.code = code;
  this.subcode = subcode;
  this.status = 500;
}

/**
 * Inherit from `Error`.
 */
FacebookGraphAPIError.prototype.__proto__ = Error.prototype;


/**
 * Expose `FacebookGraphAPIError`.
 */
module.exports = FacebookGraphAPIError;

/**
 * `FacebookTokenError` error.
 *
 * FacebookTokenError represents an error received from a Facebook's token
 * endpoint.  Note that these responses don't conform to the OAuth 2.0
 * specification.
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
function FacebookTokenError(message, type, code, subcode) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'FacebookTokenError';
  this.message = message;
  this.type = type;
  this.code = code;
  this.subcode = subcode;
  this.status = 500;
}

/**
 * Inherit from `Error`.
 */
FacebookTokenError.prototype.__proto__ = Error.prototype;


/**
 * Expose `FacebookTokenError`.
 */
module.exports = FacebookTokenError;

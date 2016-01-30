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
 * @param {string} [message]
 * @param {string} [type]
 * @param {number} [code]
 * @param {number} [subcode]
 * @param {string} [traceID]
 * @access public
 */
function FacebookTokenError(message, type, code, subcode, traceID) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'FacebookTokenError';
  this.message = message;
  this.type = type;
  this.code = code;
  this.subcode = subcode;
  this.traceID = traceID;
  this.status = 500;
}

// Inherit from `Error`.
FacebookTokenError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = FacebookTokenError;

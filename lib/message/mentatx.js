/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.menta = (function() {

    /**
     * Namespace menta.
     * @exports menta
     * @namespace
     */
    var menta = {};

    menta.Tx = (function() {

        /**
         * Properties of a Tx.
         * @memberof menta
         * @interface ITx
         * @property {string|null} [route] Tx route
         * @property {Uint8Array|null} [msg] Tx msg
         * @property {Uint8Array|null} [sender] Tx sender
         * @property {Uint8Array|null} [nonce] Tx nonce
         * @property {Uint8Array|null} [sig] Tx sig
         */

        /**
         * Constructs a new Tx.
         * @memberof menta
         * @classdesc Represents a Tx.
         * @implements ITx
         * @constructor
         * @param {menta.ITx=} [properties] Properties to set
         */
        function Tx(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tx route.
         * @member {string} route
         * @memberof menta.Tx
         * @instance
         */
        Tx.prototype.route = "";

        /**
         * Tx msg.
         * @member {Uint8Array} msg
         * @memberof menta.Tx
         * @instance
         */
        Tx.prototype.msg = $util.newBuffer([]);

        /**
         * Tx sender.
         * @member {Uint8Array} sender
         * @memberof menta.Tx
         * @instance
         */
        Tx.prototype.sender = $util.newBuffer([]);

        /**
         * Tx nonce.
         * @member {Uint8Array} nonce
         * @memberof menta.Tx
         * @instance
         */
        Tx.prototype.nonce = $util.newBuffer([]);

        /**
         * Tx sig.
         * @member {Uint8Array} sig
         * @memberof menta.Tx
         * @instance
         */
        Tx.prototype.sig = $util.newBuffer([]);

        /**
         * Creates a new Tx instance using the specified properties.
         * @function create
         * @memberof menta.Tx
         * @static
         * @param {menta.ITx=} [properties] Properties to set
         * @returns {menta.Tx} Tx instance
         */
        Tx.create = function create(properties) {
            return new Tx(properties);
        };

        /**
         * Encodes the specified Tx message. Does not implicitly {@link menta.Tx.verify|verify} messages.
         * @function encode
         * @memberof menta.Tx
         * @static
         * @param {menta.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.route != null && message.hasOwnProperty("route"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.route);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.msg);
            if (message.sender != null && message.hasOwnProperty("sender"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.sender);
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.nonce);
            if (message.sig != null && message.hasOwnProperty("sig"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.sig);
            return writer;
        };

        /**
         * Encodes the specified Tx message, length delimited. Does not implicitly {@link menta.Tx.verify|verify} messages.
         * @function encodeDelimited
         * @memberof menta.Tx
         * @static
         * @param {menta.ITx} message Tx message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tx.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tx message from the specified reader or buffer.
         * @function decode
         * @memberof menta.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {menta.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.menta.Tx();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.route = reader.string();
                    break;
                case 3:
                    message.msg = reader.bytes();
                    break;
                case 4:
                    message.sender = reader.bytes();
                    break;
                case 5:
                    message.nonce = reader.bytes();
                    break;
                case 6:
                    message.sig = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tx message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof menta.Tx
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {menta.Tx} Tx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tx.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tx message.
         * @function verify
         * @memberof menta.Tx
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Tx.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.route != null && message.hasOwnProperty("route"))
                if (!$util.isString(message.route))
                    return "route: string expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!(message.msg && typeof message.msg.length === "number" || $util.isString(message.msg)))
                    return "msg: buffer expected";
            if (message.sender != null && message.hasOwnProperty("sender"))
                if (!(message.sender && typeof message.sender.length === "number" || $util.isString(message.sender)))
                    return "sender: buffer expected";
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                if (!(message.nonce && typeof message.nonce.length === "number" || $util.isString(message.nonce)))
                    return "nonce: buffer expected";
            if (message.sig != null && message.hasOwnProperty("sig"))
                if (!(message.sig && typeof message.sig.length === "number" || $util.isString(message.sig)))
                    return "sig: buffer expected";
            return null;
        };

        /**
         * Creates a Tx message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof menta.Tx
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {menta.Tx} Tx
         */
        Tx.fromObject = function fromObject(object) {
            if (object instanceof $root.menta.Tx)
                return object;
            var message = new $root.menta.Tx();
            if (object.route != null)
                message.route = String(object.route);
            if (object.msg != null)
                if (typeof object.msg === "string")
                    $util.base64.decode(object.msg, message.msg = $util.newBuffer($util.base64.length(object.msg)), 0);
                else if (object.msg.length)
                    message.msg = object.msg;
            if (object.sender != null)
                if (typeof object.sender === "string")
                    $util.base64.decode(object.sender, message.sender = $util.newBuffer($util.base64.length(object.sender)), 0);
                else if (object.sender.length)
                    message.sender = object.sender;
            if (object.nonce != null)
                if (typeof object.nonce === "string")
                    $util.base64.decode(object.nonce, message.nonce = $util.newBuffer($util.base64.length(object.nonce)), 0);
                else if (object.nonce.length)
                    message.nonce = object.nonce;
            if (object.sig != null)
                if (typeof object.sig === "string")
                    $util.base64.decode(object.sig, message.sig = $util.newBuffer($util.base64.length(object.sig)), 0);
                else if (object.sig.length)
                    message.sig = object.sig;
            return message;
        };

        /**
         * Creates a plain object from a Tx message. Also converts values to other types if specified.
         * @function toObject
         * @memberof menta.Tx
         * @static
         * @param {menta.Tx} message Tx
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tx.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.route = "";
                if (options.bytes === String)
                    object.msg = "";
                else {
                    object.msg = [];
                    if (options.bytes !== Array)
                        object.msg = $util.newBuffer(object.msg);
                }
                if (options.bytes === String)
                    object.sender = "";
                else {
                    object.sender = [];
                    if (options.bytes !== Array)
                        object.sender = $util.newBuffer(object.sender);
                }
                if (options.bytes === String)
                    object.nonce = "";
                else {
                    object.nonce = [];
                    if (options.bytes !== Array)
                        object.nonce = $util.newBuffer(object.nonce);
                }
                if (options.bytes === String)
                    object.sig = "";
                else {
                    object.sig = [];
                    if (options.bytes !== Array)
                        object.sig = $util.newBuffer(object.sig);
                }
            }
            if (message.route != null && message.hasOwnProperty("route"))
                object.route = message.route;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = options.bytes === String ? $util.base64.encode(message.msg, 0, message.msg.length) : options.bytes === Array ? Array.prototype.slice.call(message.msg) : message.msg;
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = options.bytes === String ? $util.base64.encode(message.sender, 0, message.sender.length) : options.bytes === Array ? Array.prototype.slice.call(message.sender) : message.sender;
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                object.nonce = options.bytes === String ? $util.base64.encode(message.nonce, 0, message.nonce.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce) : message.nonce;
            if (message.sig != null && message.hasOwnProperty("sig"))
                object.sig = options.bytes === String ? $util.base64.encode(message.sig, 0, message.sig.length) : options.bytes === Array ? Array.prototype.slice.call(message.sig) : message.sig;
            return object;
        };

        /**
         * Converts this Tx to JSON.
         * @function toJSON
         * @memberof menta.Tx
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Tx.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Tx;
    })();

    return menta;
})();

module.exports = $root;

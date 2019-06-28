'use strict';

/**
 * Message for sending transactions to Menta
 */
const nacl = require('tweetnacl');
const tx = require('./mentatx').menta.Tx;
const sha256 = require('../crypto').sha256;
const nonce = require('../crypto').generateNonce;

class Message {
  /**
   * Create a message. Passing the route and a payload buffer.
   * Data may also be a protobuf encoded message
   * @param {string} route 
   * @param {Buffer} data 
   */
  constructor(route, data) {
    this.route = route;
    this.msg = data;
    this.nonce = nonce();
    this.sender = '';
    this.sig = '';
  }

  /**
   * Hash the contents for signing. This is automatically called
   * by 'sign()' 
   */
  hash() {
    let buf = tx.encode({
      sender: this.sender,
      route: this.route,
      msg: this.msg,
      nonce: this.nonce,
    }).finish()
    return sha256(buf)
  }

  /**
   * Sign the message with a given privateKey
   * @param {string | Buffer} privateKey 
   */
  sign(privateKey) {
    if (typeof privateKey === 'string') {
      // Probably a hex
      privateKey = Buffer.from(privateKey, 'hex')
    }
    let kp = nacl.sign.keyPair.fromSecretKey(privateKey)
    // Calculate the address
    this.sender = sha256(Buffer.from(kp.publicKey.buffer)).slice(0, 20)
    let msgHash = this.hash();
    this.sig = Buffer.from(nacl.sign.detached(msgHash, kp.secretKey));
  }

  /**
   * Protobuf encode the message for transport
   */
  serialize() {
    return tx.encode({
      sender: this.sender,
      route: this.route,
      msg: this.msg,
      nonce: this.nonce,
      sig: this.sig
    }).finish();
  }

  /**
   * Protobuf decode the message from a Buffer
   * @param {Buffer} bits 
   */
  static deserialize(bits) {
    let r = tx.decode(bits);
    let m = new Message(r.route, r.msg)
    m.sender = r.sender
    m.nonce = r.nonce
    m.sig = r.sig
    return m;
  }
}

module.exports = Message;

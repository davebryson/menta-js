'use strict';
/**
 * Simple Ed25519 wallet and other hash utilities
 */
const crypto = require('crypto');
const nacl = require('tweetnacl');
const assert = require('bsert');
const createHash = require('create-hash');

/**
 * Generate a ripemd160 hash
 * @param {*} data
 */
function ripemd160(data) {
    return createHash('ripemd160').update(data).digest()
}

/**
 * Generate a sha256 hash
 * @param {*} data 
 */
function sha256(data) {
    return createHash('sha256').update(data).digest()
}

/**
 * Generate a random nonce as a hex 
 * @param {number} size of the nonce on bytes (default 10)
 */
function generateNonce(size = 10) {
    return crypto.randomBytes(size).toString('hex')
}

/**
 * Ed25519 Wallet
 */
class Wallet {
    constructor(keys) {
        assert(keys, 'Expected nacl key pair')
        assert(keys.secretKey, 'Missing nacl secret key')
        this.keys = keys;
    }

    /**
     * Create a new wallet with keys
     */
    static create() {
        return new this(nacl.sign.keyPair());
    }

    /**
     * Generate a wallet from a secretKey (privateKey)
     * @param {string | Buffer} sk
     */
    static fromSecret(sk) {
        if (typeof sk === 'string') {
            // Probably hex
            sk = Buffer.from(sk, 'hex')
            return new this(nacl.sign.keyPair.fromSecretKey(sk))
        }
        assert(Buffer.isBuffer(sk), 'Expected a buffer');
        return new this(nacl.sign.keyPair.fromSecretKey(sk))
    }

    /**
     * Sign a message
     * @param {Buffer} msg 
     */
    sign(msg) {
        assert(Buffer.isBuffer(msg), 'Msg should be a buffer')
        sig = nacl.sign.detached(msg, this.keys.secretKey)
        return Buffer.from(sig).toString('hex')
    }

    /**
     * Verify a message
     * @param {Buffer} msg 
     * @param {Buffer} sig 
     */
    verify(msg, sig) {
        assert(Buffer.isBuffer(msg), 'Msg should be a buffer');
        assert(Buffer.isBuffer(sig), 'Sig should be a buffer');
        return nacl.sign.detached.verify(msg, sig, this.keys.publicKey)
    }

    /**
     * Get the address of the keys (hex)
     */
    address() {
        let pub = Buffer.from(this.keys.publicKey.buffer)
        let addy = sha256(pub).slice(0, 20)
        return addy.toString('hex')
    }

    /**
     * Return the secretKey
     */
    secretKey() {
        return this.keys.secretKey
    }

    /**
     * Generate a hex encoded values
     */
    toHex() {
        let pub = Buffer.from(this.keys.publicKey.buffer)
        let addy = sha256(pub).slice(0, 20)
        return {
            secretKey: Buffer.from(this.keys.secretKey.buffer).toString('hex'),
            publicKey: pub.toString('hex'),
            address: addy.toString('hex')
        }
    }

    /**
     * Generate 'num' key pairs. Often used for testing
     * @param {number} num 
     */
    static generateMany(num) {
        let result = []
        for (let i = 0; i < num; i++) {
            result.push(Wallet.createWallet().toHex())
        }
        return result;
    }
}

module.exports = {
    wallet: Wallet,
    sha256: sha256,
    ripemd160: ripemd160,
    generateNonce: generateNonce
}


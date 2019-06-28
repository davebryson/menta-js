const assert = require('bsert');
const RpcClient = require('./rpc');
const message = require('../message');

/**
 * 
 * Simple tendermint rpc client customized for use with Menta.
 * It offers 2 additional method for working with Menta messages.
 * 
 * Note: all other rpc calls are available via from the underlying
 * tendermint rpc client module.
 * 
 * Example use:
 * const rpclient = require('menta-js').client;
 * const Message = require('menta-js).message;
 * const Wallet = require('menta-js').crypto.wallet;
 * 
 * let bob = Wallet.create();
 * let client = rpcclient();
 * let msg = new Message('sayhello', Buffer.from('hello', 'utf8'));
 * msg.sign(bob.secretKey());
 * 
 * let result = await client.sendTx(msg);
 * ...
 * let resp = await client.query('coins', bob.address);
 * 
 * Note: This code was adapted from tendermint-js, removing unneeded code.
 */


/**
 * Send a message (tx) to Tendermint
 * 
 * Note:  The returned result from a tx broadcast can be a little confusing. 
 * IF the operation was successful, the returned checkTx/deliverTx {} will NOT
 * include a 'code' tag.  The code tag is ONLY included if it's a non-zero (fail) value.
 * 
 * @param {Message} msg - the signed Menta message to send
 * @param {Hex} privateKey - the senders privateKey needed to sign the message
 * @returns {Object} the response
 */
RpcClient.prototype.sendTx = async function (msg) {
    assert(msg instanceof message, 'Expected an instance of Message');
    return await this.broadcastTxCommit({
        tx: msg.serialize().toString('base64')
    });
}

/**
 * Query the app.  Will return:
 * {ok: true, result: some value} where 'some value' is from the app
 * OR
 * {ok: false, log: reason}
 * 
 * @param {String} queryRoute - the registered queryroute in the application (path)
 * @param {Buffer} key - the key to query (data)
 * @returns {Buffer} the response is a Buffer. The application must decode as needed
 */
RpcClient.prototype.query = async function (queryRoute, key) {
    assert(Buffer.isBuffer(key), "Key must be a buffer");

    let queryObj = {
        path: queryRoute,
        data: key.toString('hex')
    };
    let queryResult = await this.abciQuery(queryObj);
    if (queryResult.response.value) {
        return {
            ok: true,
            result: Buffer.from(queryResult.response.value, 'base64')
        }
    }
    return {
        ok: false,
        log: queryResult.response.log
    }
}

function createClient(uriString = 'ws://127.0.0.1/26657') {
    return RpcClient(uriString);
}

exports = module.exports = createClient;
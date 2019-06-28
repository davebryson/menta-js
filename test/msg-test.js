'use strict';

const assert = require('bsert');
const Message = require('../').message;
const Wallet = require('../').crypto.wallet;

describe('message', () => {
    it('should sign/encode/decode', () => {
        let bob = Wallet.create();
        let data = Buffer.from('helloworld', 'utf8');
        let m = new Message('one', data);

        m.sign(bob.secretKey());
        assert(Buffer.isBuffer(m.sig));
        assert(m.sig.length > 0);

        // serialize/deserialize
        let decodedMsg = Message.deserialize(m.serialize());
        assert(data.toString('hex') === decodedMsg.msg.toString('hex'));
        assert('one' === decodedMsg.route);

        // Verify
        let msg = decodedMsg.hash()
        assert(bob.verify(msg, decodedMsg.sig));
    });
});
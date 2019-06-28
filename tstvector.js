
const Message = require('.').message;
const Wallet = require('.').crypto.wallet;

// Used to generate messages to test again golang Menta
function generateMessage() {
    let bob = Wallet.create();
    let data = Buffer.from('helloworld', 'utf8');
    let m = new Message('one', data);
    m.sign(bob.secretKey());

    console.log(JSON.stringify({
        wallet: bob.toHex(),
        msg: m.serialize().toString('hex'),
    }))
}

generateMessage();
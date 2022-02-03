var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const config = require('../config')
const rpcURL = "HTTP://127.0.0.1:7545"; /**Ganache */
// const rpcURL = "https://mainnet.infura.io/v3/" + config.projectID;
const web3 = new Web3(rpcURL);

// const result = web3.eth.accounts.create();
// console.log(result);

const account1 = '0x6c380485121Ea7B36355b9D9CEd494515CFB41C7';
const account2 = '0xEB1b748eF1336948439423Bbbd2aE16E55057Ede';

const PRIVATE_KEY_1='970af2584d60e6e6c52daf1164b830acc49481e959acfd34fdc74d3ee963c879';
const PRIVATE_KEY_2='d8cc03be69916a330b66b663901ca9c406ef8c0a8ea264ec612e48f2ef6de32e';

const privateKey1 = Buffer.from(PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  };

  // Sign the transaction
  tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');
  console.log("raw: ", raw)

  // Broadcast transaction in the test network
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (err) console.log("sendSignedTransaction Error: ", err)
    console.log('txHash: ', txHash);
  })
})


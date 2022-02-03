var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const config = require('../config')
const rpcURL = "HTTP://127.0.0.1:7545"; /**Ganache */
const web3 = new Web3(rpcURL);

const account1 = '0x6c380485121Ea7B36355b9D9CEd494515CFB41C7';
const account2 = '0xEB1b748eF1336948439423Bbbd2aE16E55057Ede';

const PRIVATE_KEY_1='970af2584d60e6e6c52daf1164b830acc49481e959acfd34fdc74d3ee963c879';
const PRIVATE_KEY_2='d8cc03be69916a330b66b663901ca9c406ef8c0a8ea264ec612e48f2ef6de32e';

const privateKey1 = Buffer.from(PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(PRIVATE_KEY_2, 'hex')

const contractAddress = "0xbC1df33EFDf3a992C59a3EaD6eF3138382Cc46e9";
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log(contract.methods)

web3.eth.getTransactionCount(account1, (err, txCount) => {
  if(err) console.log("error: ", err);
  const data = contract.methods.transfer(account2, 1000).encodeABI()

  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: data
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

// Check Token balance for account1
contract.methods.balanceOf(account1).call((err, balance) => {
  console.log({ err, balance })
})

// Check Token balance for account2
contract.methods.balanceOf(account2).call((err, balance) => {
  console.log({ err, balance })
})


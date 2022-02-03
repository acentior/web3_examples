const Web3 = require('web3');
const config = require('../config');
const rpcURL = "https://mainnet.infura.io/v3/" + config.projectID;

const web3 = new Web3(rpcURL);
const address = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91";
web3.eth.getBalance(address, (err, wei) => {
  // console.log("err", err);
  const balance = web3.utils.fromWei(wei, 'ether');
  console.log("balance: ", balance)
});
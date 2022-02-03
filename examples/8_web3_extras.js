var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const config = require('../config')
const rpcURL = "https://mainnet.infura.io/v3/" + config.projectID;

const web3 = new Web3(rpcURL);

// Get average gas price in wei from last few blocks median gas price
web3.eth.getGasPrice().then((result) => {
  console.log("average gas price: ", web3.utils.fromWei(result, 'ether'))
})

// Use sha256 Hashing function
console.log("sha256: ", web3.utils.sha3('Dapp University'))

// Use keccak256 Hashing function (alias)
console.log("keccak256: ", web3.utils.keccak256('Dapp University'))

// Get a Random Hex
console.log("Random Hex: ", web3.utils.randomHex(32))

// Get access to the underscore JS library
// undersocre library was removed from web3.js
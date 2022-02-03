var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const config = require('./config')
const rpcURL = "https://mainnet.infura.io/v3/" + config.projectID;
const web3 = new Web3(rpcURL);

// const result = web3.eth.accounts.create();
// console.log(result);

const account1 = '0x7bD45A76874287935679d47BD1C56F13FE763f71';
const account2 = '0x0B2D90406C23E310de2059b4D57F5f858D128a9e';

const PRIVATE_KEY_1='0xb840e4403ed25dcbadef9c46a1cdaa6f89f6bb4b4ad7803c7a61446ba8ae7e3f';
const PRIVATE_KEY_2='0x684816b6abb60bd065483bdf21cdc611c64a428493a1d76c582827c33d88466c';

module.exports = {
    PRIVATE_KEY_1,
    PRIVATE_KEY_2
} 
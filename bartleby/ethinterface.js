/*UPDATE THIS WHEN A NEW CONTRACT DEPLOYED*/
const contractAddress = "0xD02f632b5495f48556e4971A993b0C1aB7b3D319";



/*DO NOT UPDATE BELOW THIS LINE*/

const PUBLIC_KEY = '0x633142716c6814feee2b26727c55a5fabbcf3171';
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/p6rsn6uYgxvk0iLKUv7NHZUwj_4izMsW"
//const { createAlchemyWeb3 } = require("./alch/alchemyWeb3.min.js");
const { createAlchemyWeb3 } = require("../../crypt0den/node_modules/@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("./artifacts/contracts/crypt3den.sol/crypt3den.json");
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);
let retval;



module.exports = async function deleteIdentity() {
	console.log("I'm here");
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'data': nftContract.methods.deleteId().encodeABI()
    };    

  const txc = web3.eth.call(tx,function(err,result) {
    if(!err) {
      retval = result;
      console.log("retval => ",retval);
      return(retval);
    } else {
      console.log("deleteId something went wrong ==> ",err);
    }
  }).catch((err) => {
    console.log("deleteId some other error ==> ",err);
  });

  return(txc);
  }
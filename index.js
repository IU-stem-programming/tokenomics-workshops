//web3 = new Web3(new Web3.providers.HttpProvider("https://sokol.poa.network"));


/*abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"numbers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
NumbersContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = NumbersContract.at('0x5275e7264ab0bb75d970e7442de0aadd0c0b85ae');
candidates = {"aaa": "num1", "bbb": "num2", "ccc": "num3"}
*/
$(document).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.log("Using web3 detected from external source like Metamask");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"numbers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
  NumbersContract = window.web3.eth.contract(abi);
  // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
  contractInstance = NumbersContract.at('0x5275e7264ab0bb75d970e7442de0aadd0c0b85ae');
  
  candidates = {"aaa": "num1", "bbb": "num2", "ccc": "num3"}
  
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.numbers.call(name, function(err, result) { if (err) {return showError("Smart contract call failed: " + err);} else {$("#" + candidates[name]).html(result.toString());}});
    $("#" + candidates[name]).html(val);
  }

});

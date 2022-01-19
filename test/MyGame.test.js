const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const RockPaperScissorsContract = artifacts.require("RockPaperScissorsContract");



contract("RockPaperScissorsGame", async accounts => {

  
  //After you deploy the contract, add the contract account number to "add contract number here"
  //Run the test and they should all fail
  //Then go to the chainlink faunt for the Rinkeby network and add the defaults
  //Run the tests and they should all pass    
    
    const ownerAccount = accounts[0];
    
    //the contract address; needs to be change if you create a new contract
    const contract = "0x683D2dd6cA20F8B015786Fd14e2333d052fa2DfA";
   
    //Need fund your account before you can play this game
   it("should put a more than 100000 wei in your account", async () => {
    const instance = await RockPaperScissorsContract.at(contract);
    const contractBal =  await instance.getBalance({ from: ownerAccount });
    const expectedBal  =   new BN("10000000000000000");
    const contractBalBN = new BN(contractBal);
    console.log(contractBalBN.toString(), "contractBal")
    const isBigger = contractBal.gt(expectedBal);

    console.log(isBigger, "isBigger");
    
    assert.isTrue(isBigger, ' Load at more than 0.01 test eth onto the contract');
 });

 //Need to fund the contact with link before you players can play the game
 it("should put  more than 100000 wei link in the account", async () => {
  const instance = await RockPaperScissorsContract.at(contract);
  const linkoncontractBal =  await instance.getLinkBalance({ from: ownerAccount });
  const expectedBal  =   new BN("10000000000000000");
    const linkcontractBalBN = new BN(linkoncontractBal);
    const isBigger = linkcontractBalBN.gt(expectedBal);

    console.log(isBigger);
  
    assert.isTrue(isBigger, ' Load at more than 0.1 test eth onto the contract');

});
 
  //You can only choice a valid move which is 0 - 2
  it("should only accept a valid move.", async () => {
   try {
    const instance = await RockPaperScissorsContract.at(contract);
    await instance.depositBet(ownerAccount, 3, { value: "1000", from: ownerAccount });
   } catch (e) {
    assert.include(e.message,  "User move can only be 0, 1 and 2");
   }
 });

//You can only deposit money if you place a bet 
 it("should not be able to deposit", async () => {
  try {
    const instance = await RockPaperScissorsContract.at(contract);
    await instance.depositBet(ownerAccount, 1, { value: "0", from: ownerAccount } );
  } catch (e) {
    assert.include(e.message, "Placing a bet is required");    
  }
});

//Need to ensure you can take profits/contract balance, but only if you have a balance and you are an owner
it("should be the owner and contract should have a balance ", async () => {

  let contractBalBN = new BN(0);
  try { 
    const instance = await RockPaperScissorsContract.at(contract);
    await instance.withdrawnProfits( {from: ownerAccount} )
    const contractBal =  await instance.getBalance({ from: ownerAccount });
    contractBalBN = new BN(contractBal);
  }
  catch(e) {

  }
const isZero = contractBalBN.isZero()
console.log(isZero, "contract bal");
assert.isTrue(isZero);

});

});

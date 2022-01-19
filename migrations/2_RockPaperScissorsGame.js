const RockPaperScissorsContract = artifacts.require("RockPaperScissorsContract");

module.exports = async (deployer, network, [defaultAccount]) => {
  // Local (development) networks need their own deployment of the LINK
  
  if (network.startsWith('development')) {
    // LinkToken.setProvider(deployer.provider)
    // try {
    //  await deployer.deploy(LinkToken, { from: defaultAccount })
    //  //await deployer.deploy(LinkToken, );
    //  await deployer.deploy(MyMockVRFCoordinator, LinkToken.address);
    //  await deployer.deploy(MyGameContract,MyMockVRFCoordinator.address,LinkToken.address);
    // } catch (err) {
    //   console.error(err)
    // }

  } else if (network.startsWith('matic')) {
    const   LINK_TOKEN = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
    const   VRF_COORDINATOR = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255';
    deployer.deploy(RockPaperScissorsContract, VRF_COORDINATOR, LINK_TOKEN, {from: defaultAccount });
  }
}



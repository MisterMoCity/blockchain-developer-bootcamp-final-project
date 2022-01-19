Below are the design descision that I made for my game:

Inheritance and Interfaces -RockPaperScissorsGame smart contract inherits the function getRandomNumber and fulfillRandomness functions from VRFConsumerBase. The VRFConsumerBase provides functionality that selects either a rock, paper, or scissors randomly so that players do not suspect the computer has an upper hand in playing the game and miners can manipulate the selection of a random number.
 
Oracles - I received a random number from the Chainlink VRF oracle. The VRFConsumerBase provider access to the Chainlink Oracle.

Access Control Design Patterns - You can only withdrawn funds from the contract if you are the contract owner. This is set with you create the contract using the contractor function. 
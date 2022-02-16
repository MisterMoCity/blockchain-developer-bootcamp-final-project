# My Final Project - Rock, Paper, Scissors Betting Game
The Rock, Paper, Scissors betting game is a game where you can bet crypto to challenge the computer to a game of Rock, Paper, Scissors. The game has three possible outcomes: a draw, a win or a loss. A player who decides to play rock will beat the computer if it has chosen scissors ("rock crushes scissors" or "breaks scissors" or sometimes "blunts scissors"), but will lose to it if played paper ("paper covers rock"); a play of paper will lose to a play of scissors ("scissors cuts paper"). If both player and computer choose the same shape, then it is a tie.  

## How to play?
1. Bet an amount of MATIC (get test MATIC from Mumbia https://faucet.polygon.technology/ )
2. Bet an amount of money (0.003)
3. Select a hand (Rock, Paper, Scissors)
4. Wait until the computer responds back with its hand


### Rules 
 1. If you win, you will win what you bet
 2. If you lose, you will lose what you bet
 3. If you Tie, you will receive what you bet back 
  NOTE: Gas fees are not included and will be drawn from all transactions

## Directory Structure:
    - Contains:
        - (ROOT)/
                - The Rock, Paper, Scissors smart contact and configuration files
        - documentation/
                avoiding_common_attacks.md - Description how I am avoiding common solidity and smart contract attacks
                deployed_address.txt - The address and test network where the smart contract is deployed
                designed_pattern_decisions -  Descriptions of the design decision for developing the smart contract         
        
        - client/
                - The REACT frontend
                
 ## How to access the game:
 https://mistermocity.github.io/blockchain-developer-bootcamp-final-project/

1. Bet between -  .01 - .03 --> The higher the amount the increases the settlement time
2. The game will respond to determine who won the hand 

Demo Video: https://www.loom.com/share/a22a0d94cd1243fabda915a93482c846
 


## How to test this project: 
     1. Git clone on the blockchain-game directory
            - Install Dependencies:
                  "@chainlink/contracts": "^0.3.0",
                  "@openzeppelin/contracts": "^4.4.1",
                  "@truffle/hdwallet-provider": "^1.4.0",
                  "bn.js": "^5.2.0",
                  "dotenv": "^12.0.4",
                  "ethers": "^5.5.2",
                  "truffle-hdwallet-provider": "^1.0.17"
                
     2. Git clone on the rpsdapp directory
          - Install Dependencies:
                    "@ethersproject/units": "^5.5.0",
                    "@testing-library/jest-dom": "^5.16.1",
                    "@testing-library/react": "^12.1.2",
                    "@testing-library/user-event": "^13.5.0",
                    "ethers": "^5.5.2",
                    "react": "^17.0.2",
                    "react-dom": "^17.0.2",
                    "react-scripts": "5.0.0",
                    "web-vitals": "^2.1.2"
                    
     3. Add a .env to add Polygon ETH Nod and Private Key 
     4. Compile and Deploy the smart contract
     5. Get the smart contract address and fund with Polygon Link(https://faucets.chain.link/mumbai) and Matic (https://faucet.polygon.technology/ (Mumbai)
     6. Go to blockchain game and insert the smart contract address that you just funded to by updating link 23 in Blockchain-game/test/MyGame.test.js
                const contract = "add your smart contract address";
     7. Run the truffle test - truffle test --network matic (all test should pass)
     8. Refund the contact with more test Matic (https://faucets.chain.link/mumbai)
     9. Go to client directory and npm start
     10. Enjoy the same

  
  ## Items still not implemented:
    1. I need to add security to stop reentry and assess for other security attacks
    2. I need to add a game toll price for playing
    3. Need to add a percentage of money you can win vs just winning what you bet
    4. I want to add functionality to incentivise people adding their money to my game so players have a chance to win bigger purses
    5. Need to revamp the front end to make it enticing for people to play
    7. Need to be able to transfer the link balance to contract owner


Send the certification to - seansmith.eth





    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


    ///@title Rock Paper Scissor Blockchain Game
    ///@author Sean B. Smith
    ///@notice This is contract and game for experimental and entertainment purposes only.
    contract RockPaperScissorsContract is VRFConsumerBase  {
        
        ///@dev Chainlink VRF related parameters for the Rinkeby network
        address public constant LINK_TOKEN =
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
        address public constant VRF_COORDINATOR =
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255;
        bytes32 public constant KEY_HASH =
            0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        uint256 public chainlinkfee = 0.0001 * 10**18;
        uint256 private randomResult;
    
        /// @notice A variable that holds the owner of the contract
        address payable public owner;

        /**  @notice Sets the VRFConsumerbase funcation and owner variable
            @param  _vrfCoordinator VRF Coordinators smart contract address on Rinkeby
            @param _link Smart contract address to the link token on Rinkeby
        */ 
        constructor(address _vrfCoordinator, address _link)
            public
            payable
            VRFConsumerBase(VRF_COORDINATOR, LINK_TOKEN)
        {
                owner = payable(msg.sender);
        }

        /** @notice Emits that a bet has been placed
            @param playerId the player id
            @param sender the address of the player that is playing the bet
            @param amount the bet placed   
        */ 
        event BetPlaced(uint256 playerId, address sender, uint256 amount);
        
        /** @notice Emits the the current contact balance 
            @param sender the address of the contract
            @param amount the currnet contract balance
        */
        event CheckBalance(address sender, uint256 amount);

        /** @notice Emit address and address balace for contract withdraws
            @param owner contract address
            @param message the contract balance
        */
        event WithdrawnProfits (address owner, uint256 message);
        
        /** @notice Emit the game outcome 
            @param sender address of the player
            @param computerHand the computer's hand
            @param amountwon detail the amount won or loss by the user
        */
        event Outcome(address indexed sender, uint256 indexed computerHand, uint256 amountwon);

        /** @notice Emit the status of the game outcome 
            @param sender address of the player
            @param outcomeStatus the outcome message of completing a game
        */
        event OutcomeStatus(address indexed sender, string indexed outcomeStatus);

        ///Requires Owner to execute funcation
        modifier onlyOwner {
        require(msg.sender == owner, 
        "You are not the game owner, piss off.");
        _;
    }

        /// @notice Holds the player game mapping
        mapping(bytes32 => uint) public playerGameMap;

        struct Playergame {
            //the player that is beting they can bet the computer
            address player;
            //the players bet
            uint256 bet;
            // the players move
            uint8 playerMove;
            // the computers move
            uint256 computerMove;
            // status on if the bet has settled
            bool betsettled;
            // Outcome of bet.
            address outcome;
            // Win amount.
            uint winAmount;
        }
        ///This is the players game
        Playergame[] public bets; 

        function recieve() external payable {}
        fallback() external payable {}


        /// @notice Get the contract balance
        /// @return The contract balance
        function getBalance() public view returns (uint256) {
            return address(this).balance;
        }

        /// @notice Get the Link balance on the contract
        /// @return The contract Link balance
        function getLinkBalance() public view returns (uint256) {
            return  LINK.balanceOf(address(this));
        }
        /// @notice Get # of bets made using this contract
        /// @return the # of bets
        function getBets() public view returns (uint256) {
            return bets.length;
        }
        
        /** 
            @notice locks in the bet on the smart contract and start the game
            @param _to address of player of the game
            @param _userMove the user move (0-Rock, 1-Paper, 2-Scissors)
            @return the bet id 
        */
        function depositBet(address _to, uint8 _userMove) public payable returns (uint256) {

            uint _amount = msg.value;

            require(
                LINK.balanceOf(address(this)) > chainlinkfee,
                "Not enough LINK - fill contract with faucet"
            );

            require(
                address(this).balance > _amount,
                "Contract does not have sufficent funds"
            );

            require(
                _amount > 0,
                "Placing a bet is required"
            );

            require(_userMove >= 0 && _userMove <= 2,
                "User move can only be 0, 1 and 2"
            );
            // add bet to smart contract
            (bool success, bytes memory transactionBytes) = address(this).call{
                value: _amount
            }("");
            require(success, "Transfer failed.");

            emit CheckBalance(address(this), address(this).balance);

            //initialize the random number
            bytes32 requestId = getRandomNumber(1204);

            //Map requestId to players game ID.
            playerGameMap[requestId] = bets.length;

            emit BetPlaced(bets.length, msg.sender, _amount);

            //push to player game map
            bets.push(Playergame(
                {
            //the player that is beting they can bet the computer
            player: _to,
            //the players bet
            bet: _amount,
            // the players move
            playerMove: _userMove,
            // the computers move
            computerMove: 0,
            // status on if the bet has settled
            betsettled: false,
            // Outcome of bet.
            outcome: 0x0000000000000000000000000000000000000000, 
            // Win amount.
            winAmount: 0 
                }
            ));
    
            return bets.length;

        }

        /// @notice requests a random number from chainlink
        /// @dev inherited method from VRFCustomerbase contract
        /// @param userProviderSeed a random number that will assist in generating a random number
        /// @return requestId the id that is returned when I request a random number
        function getRandomNumber(uint256 userProviderSeed)
            public
            returns (bytes32 requestId)
        {
            return requestRandomness(KEY_HASH, chainlinkfee);
        }

        /// @notice Gets the random number
        /// @dev inherited method from VRFCustomerbase and will be called by that contract
        /// @param requestId associated with the random request
        /// @param randomness the randmon number
        function fulfillRandomness(bytes32 requestId, uint256 randomness)
            internal
            override
        {
            //make sure that result to get random number range: 0 - 2
            randomResult = (randomness % 2);
            
            gamelogic(requestId, randomResult);
        }

        /// @notice Transfers entire contract balance contact owner
        function withdrawnProfits() public onlyOwner {

        require(address(this).balance > 0,
            "Insuffient Funds. Please actually win some money!"
            );
        
        (bool success, bytes memory transactionBytes) = owner.call{
                    value: address(this).balance
                }("");
                require(success, "Transfer failed.");

                emit WithdrawnProfits(
                    address(this),
                    address(this).balance
                );    
        }

        /** @notice Explain to an end user what this does   
            @dev Explain to a developer any extra details
            @param requestId the requestId used to look up the player game so I can get the player move 
            @param randomness a parameter just like in doxygen (must be followed by parameter name)
        */
        function gamelogic(bytes32 requestId, uint256 randomness) public payable {

            //get the game and play id(bets.length)
            uint256 playerId = playerGameMap[requestId];

            Playergame storage pg = bets[playerId];
        
            //get the user and computer info
            address _to = pg.player;
            uint256 _amount = pg.bet;
            uint8 userMove = pg.playerMove;
            pg.computerMove = randomness;

            require(
                address(this).balance > _amount,
                "Unable to accept bet due to insuffient funds"
            );

            uint8 rock = 0;
            uint8 paper = 1;
            uint8 scissors = 2; 

            if (
                (userMove == rock && pg.computerMove == scissors) ||
                (userMove == scissors && pg.computerMove == paper) ||
                (userMove == paper && pg.computerMove == rock)
            ) {
                (bool success, bytes memory transactionBytes) = _to.call{
                    value: _amount
                }("");
                require(success, "Transfer failed.");

                pg.outcome = _to;

                emit Outcome(pg.player, pg.computerMove, _amount);
                emit OutcomeStatus(pg.player, "You WON! Please try your luck again!");

            } else if (
                (userMove == rock && pg.computerMove == rock) ||
                (userMove == scissors && pg.computerMove == scissors) ||
                (userMove == paper && pg.computerMove == paper)
            ) {
                (bool success, bytes memory transactionBytes) = _to.call{
                    value: _amount
                }("");
                require(success, "Transfer failed.");

                _amount = 0;
                pg.outcome = _to;

                emit Outcome(pg.player, pg.computerMove, _amount);
                emit OutcomeStatus(pg.player, "Tied! You get your money back! Please try again!");


            } else {
                (bool success, bytes memory transactionBytes) = address(this).call{
                    value: _amount
                }("");
                require(success, "Transfer failed.");

                _amount = 0;

                pg.outcome = address(this);
                
                emit Outcome(pg.player, pg.computerMove, _amount);
                emit OutcomeStatus(pg.player, "You lost! Please try again!");
            }
            pg.betsettled =  true;
            pg.winAmount = _amount;
    
        }
    }
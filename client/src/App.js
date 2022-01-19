import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {parseEther, formatEther } from '@ethersproject/units';
import RockPaperScissorsContract from "./contracts/RockPaperScissorsContract.json";

function App() {
  
  
  const [userChoice, setUserChoice] = useState('rock');
  const [computerChoice, setComputerChoice] = useState('rock');
  const [userBet, setUserBet] = useState(0);



  //pull from contact's state

  const [userWinningsBalance, setUserWinningsBalance] = useState(0);

  //Pull my balance from the address - dont display but dont allow to play game is no money is in the bank
  const [computerBalance, setComputerBalance] = useState(0);
  const [computerWinningsBalance, setComputerWinnginsBalance] = useState(0);

  const [result, setResult] = useState('Let\'s see who wins');
  const [gameOver, setGameOver] = useState(false);

  
  
  const choices = ['Rock', 'Paper', 'Scissors'];

  const userBettingChoices = [1];

  let updatedUserWinningsBalance = 0;

  const handleOnClick = (choice) => {

    if (userBet !== 0) {

      
      




      console.log(choice + ' user choice');
      setUserChoice(choice);

      const randomChoice = choices[Math.floor(Math.random() * choices.length)];

      setComputerChoice(randomChoice);
      setUserBet(0);


      const comboMoves = choice + randomChoice;

      console.log(comboMoves + ' combo moves');

      if (comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
        setResult('User Wins');
        updatedUserWinningsBalance = userWinningsBalance + userBet;
        setUserWinningsBalance(updatedUserWinningsBalance);

        console.log('in here - user wins' + userWinningsBalance)

      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        setResult('House Wins');
        let updatedComputerPoints = computerWinningsBalance + userBet;
        setComputerWinnginsBalance(updatedComputerPoints);
        console.log('in here - computer wins')

      }
      if (comboMoves === 'paperpaper' || comboMoves === 'scissorsscissors' || comboMoves === 'rockrock') {
        setResult('It\'s a tie!');
        console.log(' in here - A tie')
      }

      setGameOver(true);

    } else {

      window.alert('Please place your bet first.');

    }
  }

  const handleOnClickBet = (theUserBet) => {

    setUserBet(theUserBet);

    console.log(theUserBet + ' User Bet')
  }


  const reset = () => {
    window.location.reload();

  }




  

  return (
    <div className="App">
      <h1 className='heading'> Rock, Paper, Scissors Betting Game</h1>
      <div className='score'>
        <h1>User Winnings: ${userWinningsBalance} </h1>
        <h1>House Winnings: ${computerWinningsBalance} </h1>
      </div>
      <div className='choices'>
        <div className='choice-user'>
          <img className='user-hand' src={`../images/${userChoice}.png`} />
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`../images/${computerChoice}.png`} />
        </div>

      </div>

      <div>
        <h1>User's Bet: ${userBet}</h1>
      </div>



      <div children='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={index} onClick={() => handleOnClick(choice)}>
            {choice}
          </button>
        )}
      </div>



      <div children='button-div'>
        {userBettingChoices.map((theUserBet, index) =>
          <button className='button' key={index} onClick={() => handleOnClickBet(theUserBet)}>
            ${theUserBet}
          </button>
        )}
      </div>

      <div className='result'>
        <h1>Final Reuslt: {result}</h1>
      </div>

      <div className='button-div'>
        {gameOver &&
          <button className='button' onClick={() => reset()} > Restart Game?</button>
        }
      </div>




    </div>

  );

}
export default App;























// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       console.log(accounts);

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     console.log(this.state);

//     // Stores a given value, 5 by default.
//     await contract.methods.set(10).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     console.log(response);

//     // Update state with the result.
//     this.setState({ storageValue: response  });
//   };







//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <Header />


//       </div>
//     );
//   }
//}

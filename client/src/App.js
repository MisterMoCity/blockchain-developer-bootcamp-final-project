import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {parseEther, formatEther } from '@ethersproject/units';
import RockPaperScissorsContract from "./contracts/RockPaperScissorsContract.json";

function App() {

const AuctionContractAddress = '0x683D2dd6cA20F8B015786Fd14e2333d052fa2DfA';
const emptyAddress = '0x0000000000000000000000000000000000000000';
  
  
  const [userChoice, setUserChoice] = useState('rock');
  const [computerChoice, setComputerChoice] = useState('rock');
  const [userBet, setUserBet] = useState(0);
  const [amount, setAmount] = useState(0);
  const [userWinnings, setUserWinnings] = useState(0);
  const [result, setResult] = useState('Let\'s see who wins');
  const [gameOver, setGameOver] = useState(false);
  const [account, setAccount] = useState('');


    //Setups up new Ethereum provider and returns an interface for interacting with the smart contract
    const initializeProvider = async () => {
      const provider =  new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider, "provider");
      const signer = provider.getSigner();
  
      console.log(signer, "signer");
      return new ethers.Contract(RockPaperScissorsContract, RockPaperScissorsContract.abi, signer);
    }
  
    //open my metamask so that I can associate it to my account 
    const requestAccount = async () => {
       const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
       setAccount(account[0]);
     }

     

  
  
  const choices = ['Rock', 'Paper', 'Scissors'];

  //const userBettingChoices = [1];

  let updatedUserWinningsBalance = 0;

  
  
  
  
  const handleOnClick = (choice) => {

    if (userBet !== 0) {


      console.log(choice + ' user choice');
      setUserChoice(choice);


      //setComputerChoice(randomChoice);
      setUserBet(0);


    

      setGameOver(true);

    } else {

      window.alert('Please place your bet first.');

    }
  }

  


  const reset = () => {
    window.location.reload();

  }


    // on the first page request get request the account information
    useEffect(() => {
      requestAccount();
    }, []);
   
    useEffect(() => {
    
    }, [account]);

 

  return (
    <div className="App">
      <h1 className='heading'> Rock, Paper, Scissors Betting Game</h1>
      <div className='score'>
      </div>
      <div className='choices'>
        <div className='choice-user'>
          <img className='user-hand' src={`./images/${userChoice}.png`} />
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`./images/${computerChoice}.png`} />
        </div>

      </div>

      <div>
        
            <label>Add your bet:
             <input 
              type="text" 
               value={userBet}
          onChange={(e) => setUserBet(e.target.value)}
        />
      </label>
     
      </div>
      <br />

      <div children='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={index} onClick={() => handleOnClick(choice)}>
            {choice}
          </button>
        )}
      </div>

      User's Winnings: 

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

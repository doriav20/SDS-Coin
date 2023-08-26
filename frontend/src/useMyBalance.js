import {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {ABI, CONTRACT_ADDRESS} from "./constants";

export function useMyBalance() {
  const [balance, setBalance] = useState(null);

  async function fetchBalance() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const myBalance = await contract.myBalance();
      setBalance(myBalance);
    } else {
      console.error('Please install MetaMask!');
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchBalance, 5000);  // fetch every 5 seconds
    return () => clearInterval(intervalId); // cleanup the interval on component unmount
  }, []);

  return { balance, fetchBalance };
}

export function BalanceDisplay() {
  const { balance, fetchBalance } = useMyBalance();

  return (
    <div>
      <button onClick={fetchBalance}>Check Balance</button>
      {balance && <p>Your balance: {balance.toString()} SDS</p>}
    </div>
  );
}
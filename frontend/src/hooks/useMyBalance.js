import {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {ABI, CONTRACT_ADDRESS} from "./constants";

export function useMyBalance() {
  const [balance, setBalance] = useState(null);
  const [decimals, setDecimals] = useState(null);

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

  async function fetchDecimals() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const contractDecimals = await contract.decimals();
      setDecimals(contractDecimals);
    }
  }

  useEffect(() => {
    fetchDecimals(); // Fetch decimals once during initial mount

    const fiveSecondsInMilliseconds = 5000;
    const intervalId = setInterval(fetchBalance, fiveSecondsInMilliseconds);  // fetch every 5 seconds
    return () => clearInterval(intervalId); // cleanup the interval on component unmount
  }, []);

  return { balance, fetchBalance, decimals };
}

export function BalanceDisplay() {
  const { balance, fetchBalance, decimals } = useMyBalance();

  let readableBalance = null;

  if (balance && decimals) {
    const integerPart = balance / (10n ** decimals);
    const fractionalPart = balance % (10n ** decimals);

    // Convert fractionalPart to string and remove trailing zeros
    let fractionalString = fractionalPart.toString().padStart(Number(decimals), '0');
    while (fractionalString.endsWith('0') && fractionalString.length > 1) {
        fractionalString = fractionalString.substring(0, fractionalString.length - 1);
    }

    readableBalance = `${integerPart}.${fractionalString}`;
  }


  return (
    <div>
      <button onClick={fetchBalance}>Check Balance</button>
      {readableBalance && <p>Your balance: {readableBalance} SDS</p>}
    </div>
  );
}
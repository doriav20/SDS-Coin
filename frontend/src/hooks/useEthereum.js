import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ABI, CONTRACT_ADDRESS } from './constants';

const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const newProvider = new ethers.BrowserProvider(window.ethereum);
            setProvider(newProvider);

            newProvider
                .getSigner()
                .then((newSigner) => {
                    setSigner(newSigner);
                    const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, newSigner);
                    setContract(newContract);
                })
                .catch(() => {
                    alert('Please allow access for the app to work');
                    setProvider(null);
                    setSigner(null);
                    setContract(null);
                });
        }
    }, []);

    return <EthereumContext.Provider value={{ provider, signer, contract }}>{children}</EthereumContext.Provider>;
}

export function useEthereum() {
    return useContext(EthereumContext);
}

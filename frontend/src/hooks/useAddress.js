import { useEffect, useState } from 'react';
import { useEthereum } from './useEthereum';

export default function useAddress() {
    const { signer } = useEthereum();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        async function fetchAddress() {
            if (signer) {
                const accountAddress = await signer.address;
                setAddress(accountAddress);
            }
        }

        fetchAddress();
    }, [signer]);

    return address;
}

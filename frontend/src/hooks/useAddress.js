import {useEffect, useState} from "react";
import {useEthereum} from "./useEthereum";
import {noop} from "../utils";

export function useAddress() {
    const {signer} = useEthereum();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        async function fetchAddress() {
            if (signer) {
                const accountAddress = await signer.address;
                setAddress(accountAddress);
            }
        }

        fetchAddress().then(noop);
    }, [signer]);

    return address;
}

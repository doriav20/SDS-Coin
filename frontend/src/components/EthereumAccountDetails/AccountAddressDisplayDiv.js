import { useAddress } from '../../hooks/useAddress';

export function AccountAddressDisplayDiv() {
    const address = useAddress();

    return (
        <>
            <div>{address && <p>{address}</p>}</div>
        </>
    );
}

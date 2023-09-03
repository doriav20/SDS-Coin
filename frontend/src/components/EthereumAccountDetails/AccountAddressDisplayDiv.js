import { useAddress } from '../../hooks/useAddress';

export function AccountAddressDisplayDiv({ style }) {
    const address = useAddress();

    return (
        <>
            <div style={style}>{address && <p>{address}</p>}</div>
        </>
    );
}

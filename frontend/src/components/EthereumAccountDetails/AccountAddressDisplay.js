import useAddress from '../../hooks/useAddress';

export default function AccountAddressDisplay({ style }) {
    const address = useAddress();

    return (
        <>
            <div style={style}>{address && <p>{address}</p>}</div>
        </>
    );
}

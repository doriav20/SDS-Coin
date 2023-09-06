import useAddress from '../../hooks/useAddress';

export default function AccountAddressDisplay({ ...props }) {
    const address = useAddress();

    return (
        <>
            <div {...props}>{address && <p>{address}</p>}</div>
        </>
    );
}

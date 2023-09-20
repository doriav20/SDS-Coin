import './Mint100Button.css';
import useMint100 from '../../hooks/useMint100';

function MintButton({ ...props }) {
    const { canMint100, mint100 } = useMint100();

    return (
        canMint100 && (
            <button {...props} className="mint100-button" onClick={mint100}>
                Mint 100 SDS
            </button>
        )
    );
}

export default MintButton;

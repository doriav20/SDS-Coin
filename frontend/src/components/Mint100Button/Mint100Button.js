import './Mint100Button.css';
import useMint100 from '../../hooks/useMint100';
import { useState } from 'react';

function MintButton({ ...props }) {
    const { canMint100, mint100 } = useMint100();
    const [clicked, setClicked] = useState(false);

    return (
        !clicked &&
        canMint100 && (
            <button
                {...props}
                className="mint100-button"
                onClick={() => {
                    setClicked(true);
                    mint100();
                }}
            >
                Mint 100 SDS
            </button>
        )
    );
}

export default MintButton;

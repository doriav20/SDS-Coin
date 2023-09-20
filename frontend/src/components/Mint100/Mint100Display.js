import useMint100 from '../../hooks/usemint100';

function MintDisplay() {
    const { handleClick, updatecan, IsCanMint100 } = useMint100();
    updatecan();

    if (!IsCanMint100) {
        return;
    }

    const ret = (
        <button className="mint100_button" onClick={handleClick}>
            mint 100
        </button>
    );

    return ret;
}

export default MintDisplay;

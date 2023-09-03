export function isValueSet(elm) {
    return !(elm === null || elm === undefined);
}

export function visualizeNumber(value, decimals) {
    if (!isValueSet(value) || !isValueSet(decimals)) {
        return null;
    }
    const integerPart = value / 10n ** decimals;
    const fractionalPart = value % 10n ** decimals;

    if (fractionalPart === 0n) {
        return integerPart.toString();
    }

    // Convert fractionalPart to string and remove trailing zeros
    let fractionalString = fractionalPart.toString().padStart(Number(decimals), '0');
    while (fractionalString.endsWith('0')) {
        fractionalString = fractionalString.substring(0, fractionalString.length - 1);
    }

    return `${integerPart}.${fractionalString}`;
}

export function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}

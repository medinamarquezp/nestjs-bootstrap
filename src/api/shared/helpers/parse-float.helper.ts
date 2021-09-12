const numsAfterDecimalPoint = 3;

export function parseFloatAll<T>(input): T {
    if (!input) {
        return input;
    }
    const keys = Object.keys(input);
    keys.forEach((key) => {
        if (input && input[key] && !isNaN(input[key])) {
            input[key] = parseFloat(
                parseFloat(input[key]).toFixed(numsAfterDecimalPoint),
            );
        }
        if (typeof input[key] !== null && typeof input[key] === 'object') {
            parseFloatAll(input[key]);
        }
    });
    return input;
}

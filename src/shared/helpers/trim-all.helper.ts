export function trimAll<T>(payload): T | T[] | string {
    if (Array.isArray(payload)) {
        const trimmed = payload.map((item) => {
            return trimAll(item);
        });
        return trimmed as T[];
    }
    if (typeof payload === 'object') {
        const payloadCopy = { ...payload };
        const keys = Object.keys(payload);
        keys.forEach((key) => {
            if (typeof payloadCopy[key] === 'string') {
                payloadCopy[key] = payloadCopy[key].trim();
            }
            if (typeof payloadCopy[key] === 'object') {
                payloadCopy[key] = trimAll(payloadCopy[key]);
            }
        });
        return payloadCopy;
    }
    if (typeof payload === 'string') {
        return payload.trim();
    }

    return payload;
}

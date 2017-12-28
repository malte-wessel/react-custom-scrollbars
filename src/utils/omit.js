export function omit(object, omitKeys) {
    const allKeys = Object.keys(object);

    const result = {};
    for (let i = 0, ln = allKeys.length; i !== ln; i++) {
        const key = allKeys[i];
        if (omitKeys.indexOf(key) === -1) {
            result[key] = object[key];
        }
    }
    return result;
}

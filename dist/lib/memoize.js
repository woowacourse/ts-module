"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheData = new Map();
function memoize(cacheFunction, key = '') {
    const memoized = (...args) => {
        const isCached = cacheData.has(cacheFunction);
        isCached === false && cacheData.set(cacheFunction, {});
        const cache = cacheData.get(cacheFunction);
        if (cache[key]) {
            return cache[key];
        }
        const result = cacheFunction(...args);
        cache[key] = result;
        cacheData.set(cacheFunction, cache);
        return result;
    };
    return memoized;
}
exports.default = memoize;
//# sourceMappingURL=memoize.js.map
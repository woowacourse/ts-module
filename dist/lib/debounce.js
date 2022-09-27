"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeoutIDCache = new Map();
function debounce(targetFunction, delay) {
    const clearPreviousTimeout = () => timeoutIDCache.has(targetFunction) && clearTimeout(timeoutIDCache.get(targetFunction));
    const timerCallback = (args) => () => {
        timeoutIDCache.delete(targetFunction);
        targetFunction(...args);
    };
    const debounced = (...args) => {
        clearPreviousTimeout();
        timeoutIDCache.set(targetFunction, setTimeout(timerCallback(args), delay));
    };
    return Object.assign(debounced, {
        cancel: clearPreviousTimeout,
    });
}
exports.default = debounce;
//# sourceMappingURL=debounce.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeoutIDCache = new Map();
function throttle(targetFunction, delay) {
    const clearPreviousTimeout = () => timeoutIDCache.has(targetFunction) && clearTimeout(timeoutIDCache.get(targetFunction));
    const timerCallback = (args) => () => {
        timeoutIDCache.delete(targetFunction);
        targetFunction(...args);
    };
    const throttled = (...args) => {
        if (timeoutIDCache.has(targetFunction))
            return;
        targetFunction(...args);
        clearTimeout(timeoutIDCache.get(targetFunction));
        timeoutIDCache.set(targetFunction, setTimeout(timerCallback(args), delay));
    };
    return Object.assign(throttled, {
        cancel: clearPreviousTimeout,
    });
}
exports.default = throttle;
//# sourceMappingURL=throttle.js.map
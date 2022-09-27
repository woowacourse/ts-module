"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
function _(selector) {
    var element = document.querySelector(selector);
    console.log(document.querySelector("body"));
    return {
        element: element,
        innerHTML: function (template) {
            element.innerHTML = template;
        },
        show: function () {
            element.style.display = "block";
        },
        hide: function () {
            element.style.display = "none";
        },
        addEvent: function (eventType, callback) {
            element.addEventListener(eventType, callback);
        }
    };
}
(function (_1) {
    //   export function fetch(info: Request | string, init?: RequestInit): void;
    function isNull(value) {
        return value === null;
    }
    _1.isNull = isNull;
    function isNil(value) {
        return value === null || value === undefined;
    }
    _1.isNil = isNil;
    function isNumber(value) {
        return typeof value === "number";
    }
    _1.isNumber = isNumber;
    function isFunction(value) {
        return typeof value === "function";
    }
    _1.isFunction = isFunction;
    function shuffle(array) {
        var duplicatedArray = JSON.parse(JSON.stringify(array));
        duplicatedArray.sort(function () { return Math.random() - 0.5; });
        return duplicatedArray;
    }
    _1.shuffle = shuffle;
    function pick(object, target) {
        return Object.entries(object)
            .filter(function (_a) {
            var key = _a[0], _ = _a[1];
            return target.includes(key);
        })
            .reduce(function (acc, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[key] = value, _b)));
        }, {});
    }
    _1.pick = pick;
    function omit(object, target) {
        var newObj = __assign({}, object);
        target.forEach(function (key) {
            delete newObj[key];
        });
        return newObj;
    }
    _1.omit = omit;
    function memoize(func, resolver) {
        var memoized = function (args) {
            var key = resolver ? resolver.apply(this, args) : args[0];
            var cache = memoized.cache;
            if (cache.has(key)) {
                return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result) || cache;
            return result;
        };
        memoized.cache = new Map();
        return memoized;
    }
    _1.memoize = memoize;
    function debounce(func, wait, options) {
        var maxWait, result, timerId, lastCallTime, lastInvokeTime, leading = false, trailing = false;
        if (typeof func != "function") {
            throw new TypeError("함수를 기대했습니다..");
        }
        wait = +wait || 0;
        if (options) {
            leading = !!options.leading;
            trailing = !!options.trailing;
        }
        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime;
            var timeSinceLastInvoke = time - lastInvokeTime;
            return (lastCallTime === undefined ||
                timeSinceLastCall >= wait ||
                timeSinceLastCall < 0 ||
                timeSinceLastInvoke >= maxWait);
        }
        function startTimer(pendingFunc, wait) {
            return setTimeout(pendingFunc, wait);
        }
        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime;
            var timeWaiting = wait - timeSinceLastCall;
            return timeWaiting;
        }
        function timerExpired() {
            var time = Date.now();
            if (shouldInvoke(time)) {
                return;
            }
            timerId = startTimer(timerExpired, remainingWait(time));
        }
        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            lastInvokeTime = 0;
        }
        function flush() {
            return timerId === undefined ? result : null;
        }
        function debounced() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var time = Date.now();
            if (shouldInvoke(time)) {
                timerId = startTimer(timerExpired, wait);
                lastInvokeTime = time;
                return func.apply(this, args);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }
    _1.debounce = debounce;
    function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
            throw new TypeError("함수를 기대했습니다..");
        }
        if (options) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
            leading: leading,
            maxWait: wait,
            trailing: trailing
        });
    }
    _1.throttle = throttle;
    function clickOutside(eventTarget, innerElement) {
        return !innerElement.contains(eventTarget);
    }
    _1.clickOutside = clickOutside;
})(_ || (_ = {}));
exports["default"] = _;

function _(selector) {
    const element = document.querySelector(selector);
    element['innerHTML'] = element.innerHTML;
    element['show'] = function () {
        element.style.visibility = 'visible';
    };
    element['hide'] = function () {
        element.style.visibility = 'hidden';
    };
    element['addEvent'] = function (cmd, callback) {
        element.addEventListener(cmd, callback);
    };
    return element;
}
(function (_1) {
    function fetch(input, init) {
        return fetch(input, init);
    }
    _1.fetch = fetch;
    function isNull(value) {
        return value === null;
    }
    _1.isNull = isNull;
    function isNil(value) {
        return value === null || value === undefined;
    }
    _1.isNil = isNil;
    function isNumber(value) {
        return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
    }
    _1.isNumber = isNumber;
    function isFunction(value) {
        return typeof value === 'function';
    }
    _1.isFunction = isFunction;
    function shuffle(array) {
        const result = array.map((el) => el);
        result.forEach((_, index) => {
            const random = index + Math.floor(Math.random() * (array.length - index));
            [result[random], result[index]] = [result[index], result[random]];
        });
        return result;
    }
    _1.shuffle = shuffle;
    function pick(object, paths) {
        return Object.fromEntries(Object.entries(object).filter((el) => paths.includes(el[0])));
    }
    _1.pick = pick;
    function omit(object, paths) {
        return Object.fromEntries(Object.entries(object).filter((el) => !paths.includes(el[0])));
    }
    _1.omit = omit;
    function memoize(func, resolver) {
        if (typeof func !== 'function' || (!isNil(resolver) && typeof resolver !== 'function')) {
            throw new TypeError('Expected a function');
        }
        const memoized = function (...args) {
            const key = resolver ? resolver(...args) : args[0];
            const cache = memoized.cache;
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func(...args);
            memoized.cache = cache.set(key, result) || cache;
            return result;
        };
        memoized.cache = new Map();
        return memoized;
    }
    _1.memoize = memoize;
    function debounce(callback, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }
    _1.debounce = debounce;
    function throttle(callback, delay) {
        let timer;
        return function (...args) {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    callback(...args);
                }, delay);
            }
        };
    }
    _1.throttle = throttle;
    function clickOutside(element, callback) {
        document.addEventListener('click', function (event) {
            const target = event.target;
            if (!element.contains(target)) {
                callback(event);
            }
        });
    }
    _1.clickOutside = clickOutside;
})(_ || (_ = {}));
export default _;

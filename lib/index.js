import { defaultFetchOptions } from "./constants";
class CustomElement {
    element;
    constructor(selector) {
        this.element = document.body.querySelector(selector);
    }
    innerHTML(HTMLString) {
        if (_.isNull(this.element)) {
            throw "Invalid Element";
        }
        this.element.innerHTML = HTMLString;
    }
    show() {
        if (_.isNull(this.element)) {
            throw "Invalid Element";
        }
        this.element.style.display = "block";
    }
    hide() {
        if (_.isNull(this.element)) {
            throw "Invalid Element";
        }
        this.element.style.display = "none";
    }
    addEvent(type, listener) {
        if (_.isNull(this.element)) {
            throw "Invalid Element";
        }
        this.element.addEventListener(type, listener);
    }
}
function _(selector) {
    const customElement = new CustomElement(selector);
    return customElement;
}
(function (_) {
    /**
     * `url` 과 `options` 을 통해서 API 요청을 보낸다.
     */
    function fetch(url, options) {
        return fetch(url, { ...defaultFetchOptions, ...options });
    }
    _.fetch = fetch;
    /**
     * `value` 가 `null` 인지 체크한다.
     */
    function isNull(value) {
        return value === null;
    }
    _.isNull = isNull;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     */
    function isNil(value) {
        return value == null;
    }
    _.isNil = isNil;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     */
    function isNumber(value) {
        return typeof value === "number";
    }
    _.isNumber = isNumber;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     */
    function isFunction(value) {
        return typeof value === "function";
    }
    _.isFunction = isFunction;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     */
    _.shuffle = (array) => {
        const length = array === null ? 0 : array.length;
        if (!length) {
            return [];
        }
        let index = -1;
        const lastIndex = length - 1;
        const result = [...array];
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
            const value = result[rand];
            result[rand] = result[index];
            result[index] = value;
        }
        return result;
    };
    /**
     * 선택한 'object' 속성만으로 구성된 객체를 만든다.
     */
    function pick(object, path) {
        const newObj = { ...object };
        Object.keys(object).forEach((key) => {
            if (path.indexOf(key) === -1) {
                delete newObj[key];
            }
        });
        return newObj;
    }
    _.pick = pick;
    /**
     * 선택한 'object' 속성이 제외되어 구성된 객체를 만든다.
     */
    function omit(object, path) {
        const newObj = { ...object };
        path.forEach((key) => {
            delete newObj[key];
        });
        return newObj;
    }
    _.omit = omit;
    /**
     * 'func'의 결과를 메모하는 함수를 만든다.
     */
    function memoize(func, resolver) {
        const memoized = function (args) {
            const key = resolver ? resolver.apply(this, args) : args[0];
            const cache = memoized.cache;
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func.apply(this, args);
            memoized.cache = cache.set(key, result) || cache;
            return result;
        };
        memoized.cache = new Map();
        return memoized;
    }
    _.memoize = memoize;
    /**
     * 'func' 호출을 'wait' 이후까지 지연시키는 디바운스 함수를 만든다.
     */
    function debounce(func, wait, options) {
        let maxWait, result, timerId, lastCallTime, lastInvokeTime;
        // 구현 간소화를 위해 사용하지는 않음
        let leading = false;
        let trailing = false;
        wait = +wait || 0;
        if (options) {
            leading = !!options.leading;
            trailing = !!options.trailing;
        }
        function shouldInvoke(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;
            return (lastCallTime === undefined ||
                timeSinceLastCall >= wait ||
                timeSinceLastCall < 0 ||
                timeSinceLastInvoke >= maxWait);
        }
        function startTimer(pendingFunc, wait) {
            return setTimeout(pendingFunc, wait);
        }
        function remainingWait(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeWaiting = wait - timeSinceLastCall;
            return timeWaiting;
        }
        function timerExpired() {
            const time = Date.now();
            if (shouldInvoke(time)) {
                return;
            }
            timerId = startTimer(timerExpired, remainingWait(time));
        }
        function cancelTimer(id) {
            clearTimeout(id);
        }
        function cancel() {
            if (timerId !== undefined) {
                cancelTimer(timerId);
            }
            lastInvokeTime = 0;
        }
        function flush() {
            return timerId === undefined ? result : null;
        }
        function pending() {
            return timerId !== undefined;
        }
        function debounced(...args) {
            const time = Date.now();
            if (shouldInvoke(time)) {
                timerId = startTimer(timerExpired, wait);
                lastInvokeTime = time;
                return func.apply(this, args);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        debounced.pending = pending;
        return debounced;
    }
    _.debounce = debounce;
    /**
     * "wait" 밀리초마다 최대 한 번(또는 브라우저 프레임당 한 번) 'func'를 호출하는 쓰로틀 함수를 만든다.
     */
    function throttle(func, wait, options) {
        let leading = true;
        let trailing = true;
        if (options) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
            leading,
            trailing,
        });
    }
    _.throttle = throttle;
    /**
     * 클릭된 영역(eventTarget)이 innerElement 에 포함 되어있는지 확인한다.
     */
    function clickOutside(eventTarget, innerElement) {
        return !innerElement.contains(eventTarget);
    }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
export default _;

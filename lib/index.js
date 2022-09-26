class CustomElement {
    constructor(selector) {
        this.element = document.body.querySelector(selector);
    }
    insertHTML(HTMLString) {
        if (_.isNull(this.element)) {
            throw "유효한 Element가 아닙니다";
        }
        this.element.innerHTML = HTMLString;
    }
    show() {
        if (_.isNull(this.element)) {
            throw "유효한 Element가 아닙니다";
        }
        this.element.style.display = "block";
    }
    hide() {
        if (_.isNull(this.element)) {
            throw "유효한 Element가 아닙니다";
        }
        this.element.style.display = "none";
    }
    addEvent(type, listener) {
        if (_.isNull(this.element)) {
            throw "유효한 Element가 아닙니다";
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
     * 서버에 네트워크 요청을 보내고 새로운 데이터를 받아온다.
     *
     * @param url fetch할 url
     * @param options fetch 옵션
     */
    function fetch(url, options) {
        return fetch(url, Object.assign({}, options));
    }
    _.fetch = fetch;
    /**
     * `value`가 `null`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isNull(value) {
        return value === null;
    }
    _.isNull = isNull;
    /**
     * `value` 가 `null` 혹은 `undefined`인지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isNil(value) {
        return value == null;
    }
    _.isNil = isNil;
    /**
     * `value`가 `Number` 원시값 또는 객체로 분류될 수 있는지 체크한다.(Infinity, -Infinity, NaN이 포함된다)
     *
     * @param {*} value 체크할 값
     */
    function isNumber(value) {
        return typeof value === "number";
    }
    _.isNumber = isNumber;
    /**
     *  `value`가 `Function` 객체로 분류되는지 체크한다.
     *
     * @param {*} value 체크할 값
     */
    function isFunction(value) {
        return typeof value === "function";
    }
    _.isFunction = isFunction;
    /**
     * 무작위로 섞인 값들의 배열을 생성한다.
     *
     * @param {Array} 무작위로 섞을 배열
     * @returns {Array} 무작위로 섞인 배열을 반환한다
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
     * 객체에서 추출된 속성으로 구성된 객체를 만든다
     *
     * @param {*} object 추출할 대상 객체
     * @param {*} targetList 추출하려는 리스트
     * @returns {*} 새 객체를 반환한다
     *
     * const object = {'a': 1, 'b': 2, 'c': 3}
     *
     * pick(object, ['a','c'])
     * // => {'a':1, 'c':3}
     */
    _.pick = (object, targetList) => {
        if (object === null) {
            return {};
        }
        const pickedObject = {};
        Object.keys(object).forEach((key, index) => {
            targetList.forEach(target => {
                if (target === key) {
                    Object.assign(pickedObject, {
                        [key]: Object.values(object)[index],
                    });
                }
            });
        });
        return pickedObject;
    };
    /**
     * 생략할 리스트를 전달한 후 객체에서 생략되지 않은 속성들로 구성된 객체를 반환한다.
     *
     * @param {*} value 체크할 값
     */
    _.omit = (object, targetList) => {
        if (!targetList.length)
            return object;
        if (object === null) {
            return {};
        }
        const omittedObject = Object.assign({}, object);
        Object.keys(object).forEach(key => {
            targetList.forEach(target => {
                if (target === key) {
                    delete omittedObject[key];
                }
            });
        });
        return omittedObject;
    };
    /**
     * 함수의 결과를 기억하는 함수를 생성한다.
     *
     * @param func 기억해야 할 결과를 가진 함수
     * @param resolver 캐시 키를 resolve할 함수
     * @return 새로운 memoizing 함수를 반환한다
     */
    function memoize(func, resolver) {
        if (typeof func != "function" ||
            (resolver != null && typeof resolver != "function")) {
            throw new TypeError("함수를 기대했어요..");
        }
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
     * 호출한 함수를 지정한 시간만큼 지연시키는 디바운스 함수를 만든다.
     *
     * @param func 디바운스할 함수
     * @param wait 기다릴 시간 milliseconds
     * @param options 옵션 객체
     * @return 디바운스된 함수를 반환한다.
     */
    function debounce(func, wait, options) {
        let maxWait, result, timerId, lastCallTime, lastInvokeTime, leading = false, trailing = false;
        if (typeof func != "function") {
            throw new TypeError("함수를 기대했습니다..");
        }
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
        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            lastInvokeTime = 0;
        }
        function flush() {
            return timerId === undefined ? result : null;
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
        return debounced;
    }
    _.debounce = debounce;
    /**
     * 지정한 매 'wait' millisecond 마다  최대 한 번만 호출되도록 하는 조절된 함수를 만든다.
     *
     * @param func 쓰로틀할 함수
     * @param wait 기다릴 시간 milliseconds
     * @param options 옵션 객체
     * @return 쓰로틀된 함수를 반환한다.
     */
    function throttle(func, wait, options) {
        let leading = true, trailing = true;
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
            trailing: trailing,
        });
    }
    _.throttle = throttle;
    /**
     * 클릭된 영역이 내부 요소에 포함되어 있는지 확인한다.
     *
     * @param eventTarget 클릭된 영역
     * @param innerElement 내부 요소
     */
    function clickOutside(eventTarget, innerElement) {
        return !innerElement.contains(eventTarget);
    }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
export default _;

function _(selector) {
    const el = document.querySelector(selector);
    const get = () => el;
    const innerHTML = () => el.innerHTML;
    const show = () => (el.style.display = "block");
    const hidden = () => (el.style.display = "none");
    const addEvent = (type, listener) => el.addEventListener(type, listener);
    return {
        get,
        innerHTML,
        show,
        hidden,
        addEvent,
    };
}
(function (_) {
    function fetch(path, config) {
        return global.fetch(path, config).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    _.fetch = fetch;
    /**
     * parameter가 null인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNull(value) {
        return value === null;
    }
    _.isNull = isNull;
    /**
     * parameter가 null혹은 undefined인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNil(value) {
        return value === null || value === undefined;
    }
    _.isNil = isNil;
    /**
     * parameter의 타입이 number인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isNumber(value) {
        return (typeof value === "number" ||
            Object.prototype.toString.call(value) === "[object Number]");
    }
    _.isNumber = isNumber;
    /**
     * parameter가 Function인지 판별한다.
     * @param {*} value
     * @return {boolean} false or true
     */
    function isFunction(value) {
        return (typeof value === "function" ||
            Object.prototype.toString.call(value) === "[object Function]");
    }
    _.isFunction = isFunction;
    /**
     * parameter 배열을 무작위로 섞어 반환한다.
     * @param {Array} Array
     * @return {Array} Array
     */
    function shuffle([...array]) {
        let m = array.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [array[m], array[i]] = [array[i], array[m]];
        }
        return array;
    }
    _.shuffle = shuffle;
    /**
     * object에서 keys의 요소만 골라 새로운 객체로 반환한다.
     * @param {Object} object
     * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
     * @return {Object} keys로만 포함된 새로운 객체를 반환한다.
     */
    function pick(object, ...keys) {
        const newObject = {};
        keys.forEach((key) => {
            newObject[key] = object[key];
        });
        return newObject;
    }
    _.pick = pick;
    /**
     *
     * @param {Object} object
     * @param {...(string| string[])} keys rest parameter는 object의 key값이다.
     * * @return {Object} keys 제거된 새로운 객체를 반환한다.
     */
    function omit(object, ...keys) {
        const newObject = {};
        const OriginalKeys = Object.keys(object);
        const newKeys = OriginalKeys.filter((key) => !keys.includes(key));
        newKeys.forEach((key) => {
            newObject[key] = object[key];
        });
        return newObject;
    }
    _.omit = omit;
    /**
     * cache에 함수의 결과값이 저장되어 있으면 cache에 저장된 값을 반환한다.
     * @param func 실행시킬 함수
     * @returns 캐시에 저장된 함수의 결과값
     */
    function memoize(func) {
        const cache = {};
        return function (n) {
            if (cache[n])
                return cache[n];
            cache[n] = func(n);
            return cache[n];
        };
    }
    _.memoize = memoize;
    /**
     * 디바운스 함수
     * @param func 함수 실행 체크
     * @param wait 타이머 시간
     */
    function debounce(func, wait) {
        let timer = undefined;
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func();
                clearTimeout(timer);
            }, wait);
        };
    }
    _.debounce = debounce;
    /**
     * 쓰로틀링 함수
     * @param func 함수 실행 체크
     * @param wait 타이머 시간
     */
    function throttle(func, wait) {
        let timer = null;
        return () => {
            if (!timer) {
                timer = setTimeout(() => {
                    func();
                    timer = null;
                }, wait);
            }
        };
    }
    _.throttle = throttle;
    /**
     * 두 Element 비교
     * @param outerElement
     * @param innerElement
     */
    function clickOutside(outerElement, innerElement) {
        return outerElement.contains(innerElement);
    }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
export default _;

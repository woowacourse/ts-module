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
        // HTMLElementEventMap
        this.element.addEventListener(type, listener);
    }
}
function _(selector) {
    const customElement = new CustomElement(selector);
    return customElement;
}
(function (_) {
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function fetch() { }
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
     *
     *
     * @param {*} value 체크할 값
     */
    function pick() { }
    _.pick = pick;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function omit() { }
    _.omit = omit;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function memoize() { }
    _.memoize = memoize;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function debounce() { }
    _.debounce = debounce;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function throttle() { }
    _.throttle = throttle;
    /**
     *
     *
     * @param {*} value 체크할 값
     */
    function clickOutside() { }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
export default _;

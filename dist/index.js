"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _(selector) {
    const element = document.querySelector(selector);
    if (_.isNull(element))
        throw new Error("요소가 없습니다!");
    const addEvent = () => {
        element.addEventListener;
    };
    element.addEvent = addEvent;
    return element;
}
(function (_) {
    /**
     *
     * @param url
     * @param options
     * @returns
     */
    function fetch(url, options) {
        return fetch(url, options);
    }
    _.fetch = fetch;
    /**
     * @param value
     * @returns return true if value is null
     */
    function isNull(value) {
        return value === null;
    }
    _.isNull = isNull;
    /**
     *
     * @param value
     * @returns return true if value is null or false
     */
    function isNil(value) {
        return value == null;
    }
    _.isNil = isNil;
    /**
     *
     * @param value
     * @returns return true if type of value is primitive number
     */
    function isNumber(value) {
        return typeof value === "number";
    }
    _.isNumber = isNumber;
    /**
     * @param value
     * @returns return true if type of value is function
     */
    function isFunction(value) {
        return typeof value === "function";
    }
    _.isFunction = isFunction;
    /**
     * @param array
     * @returns shuffled array which has same type of param array
     * @example shuffle([1, 2, 3, 4]) => [2, 4, 3, 1]
     * 여러 타입이 담긴 array는 우선 생각 안함. array 내의 type이 모두 동일하다고 하고 구현
     * 매개변수로 depth가 1인 flat한 배열만 들어온다고 가정
     */
    function shuffle(array) {
        const copyArray = [...array];
        const arrayLength = array.length;
        if (arrayLength <= 1)
            return array;
        for (let i = 0; i < arrayLength; i++) {
            const rand = i + Math.floor(Math.random() * (arrayLength - i));
            const value = copyArray[rand];
            copyArray[rand] = copyArray[i];
            copyArray[i] = value;
        }
        return copyArray;
    }
    _.shuffle = shuffle;
    /**
     * @param object
     * @param keys
     * @returns partial array of object which has `param keys`
     * @example pick( {a: 1, b: "c"}, ['b'] ) => {b: 'c'}
     * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
     */
    function pick(object, keys) {
        const result = {};
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = object[key];
        }
        return result;
    }
    _.pick = pick;
    /**
     * @param object
     * @param keys
     * @returns partial array of object without `param keys`
     * @example omit( {a: 1, b: "c"}, ['b'] ) => {a: 1}
     * 매개변수로 depth가 1인 flat한 객체만 들어온다고 가정
     */
    function omit(object, keys) {
        const result = Object.assign({}, object);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            delete result[key];
        }
        return result;
    }
    _.omit = omit;
    /**
     *
     * @param func
     * @param resolver
     * @returns
     */
    function memoize(func) {
        // const value = func;
        // const memoized = () => value;
        // return memoized;
        return func;
    }
    _.memoize = memoize;
    function debounce(func, wait) {
        return func;
    }
    _.debounce = debounce;
    function throttle(func, wait) {
        return func;
    }
    _.throttle = throttle;
    function clickOutside(target, func) { }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
exports.default = _;

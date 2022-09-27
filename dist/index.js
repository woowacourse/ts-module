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
/**
 * 전달한 selector에 해당되는 요소를 찾고, 해당 요소에서 사용할 수 있는 커스텀 메서드를 반환한다.
 *
 * @param selector - Selector은 document의 자식 요소들 중 selector와 일치하는 요소를 찾을 때 사용된다.
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다..
 */
function _(selector) {
    var target = document.querySelector(selector);
    if (target !== null) {
        target.addEvent = function (type, listener) {
            target.addEventListener(type, listener);
        };
    }
    return target;
    /**
     * innerHTML() {
     * }
     *
     * show() {
     * }
     *
     * hidden() {
     * }
     *
     * addEvent() {
     * }
     */
}
(function (_) {
    function fetch() {
        return {};
    }
    _.fetch = fetch;
    /**
     * 전달한 value가 null인지 확인하는 함수
     *
     * @param value - Value는 null인지 확인하려는 값이다.
     * @returns Value가 null이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    _.isNull = function (value) { return value === null; };
    /**
     * 전달한 value가 null 또는 undefined 타입인지 확인하는 함수
     *
     * @param value - Value는 null 또는 undefined 타입인지 확인하려는 값이다.
     * @returns Value가 null 또는 undefined 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    _.isNil = function (value) {
        return typeof value === 'undefined' || value === null;
    };
    /**
     * 전달한 value가 number 타입인지 확인하는 함수
     *
     * @param value - Value는 number 타입인지 확인하려는 값이다.
     * @returns Value가 number 타입이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    _.isNumber = function (value) { return typeof value === 'number'; };
    /**
     * 전달한 value가 함수인지 확인하는 함수
     *
     * @param value - Value는 함수인지 확인하려는 값이다.
     * @returns Value가 함수이면 true를 반환한다. 그렇지 않으면 false를 반환한다.
     */
    _.isFunction = function (value) { return value instanceof Function; };
    _.shuffle = function (collection) {
        if (collection instanceof Array) {
            return collection.sort(function () { return (Math.random() > 0.5 ? 1 : -1); });
        }
        return Object.values(collection).sort(function () { return (Math.random() > 0.5 ? 1 : -1); });
    };
    _.pick = function (object, paths) {
        var copiedObject = __assign({}, object);
        return copiedObject;
    };
    function omit() { }
    _.omit = omit;
    function memoize() { }
    _.memoize = memoize;
    function debounce() { }
    _.debounce = debounce;
    function throttle() { }
    _.throttle = throttle;
    function clickOutside() { }
    _.clickOutside = clickOutside;
})(_ || (_ = {}));
exports["default"] = _;
var test = { 1: 1, 2: 3 };
var test2 = { 1: 1 };

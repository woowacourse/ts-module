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
 * @returns HTMLElement를 확장한 CustomElement 객체 또는 null을 반환한다.
 */
function _(selector) {
    var target = document.querySelector(selector);
    if (target !== null) {
        target.insertHTML = function (html) {
            target.innerHTML = html;
            return target.innerHTML;
        };
        target.addEvent = function (type, listener) {
            target.addEventListener(type, listener);
        };
        target.show = function () {
            target.style.display = 'block';
        };
        target.hide = function () {
            target.style.display = 'none';
        };
    }
    return target;
}
(function (_) {
    _.fetch = function (url, options) {
        return window.fetch(url, options);
    };
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
    /**
     * 전달한 collection을 값 또는 요소를 무작위로 섞은 후 결과를 반환한다.
     *
     * @param collection - Collection은 요소를 섞을 배열 또는 값을 섞을 객체이다.
     * @returns Collection은 요소 또는 값을 섞은 결과를 배열로 반환한다..
     */
    _.shuffle = function (collection) {
        if (collection instanceof Array) {
            return collection.sort(function () { return (Math.random() > 0.5 ? 1 : -1); });
        }
        return Object.values(collection).sort(function () { return (Math.random() > 0.5 ? 1 : -1); });
    };
    /**
     * 전달한 object의 키 중 paths에 속한 키들만을 찾아서 반환한다.
     *
     * @param object - 대상이 되는 object이다.
     * @param paths - Object의 키들 중 반환할 키들의 배열이다.
     * @returns Object의 키 중 paths에 속한 키들을 찾고, 새로운 객체를 만들어서 반환한다.
     */
    _.pick = function (object, paths) {
        var copiedObject1 = __assign({}, object);
        var copiedObject2 = __assign({}, object);
        paths.forEach(function (key) {
            delete copiedObject1[key];
        });
        var tempKeys = Object.keys(copiedObject1);
        Object.keys(object).forEach(function (key) {
            if (tempKeys.includes(key)) {
                delete copiedObject2[key];
            }
        });
        return copiedObject2;
    };
    /**
     * 전달한 object의 키 중 paths에 속한 키들만을 제외하고 반환한다.
     *
     * @param object - 대상이 되는 object이다.
     * @param paths - Object의 키들 중 제외할 키들의 배열이다.
     * @returns Object의 키 중 paths에 속한 키들을 제외하고, 새로운 객체를 만들어서 반환한다.
     */
    _.omit = function (object, paths) {
        var copiedObject = __assign({}, object);
        paths.forEach(function (key) {
            delete copiedObject[key];
        });
        return copiedObject;
    };
    /**
     * Func로 전달한 함수의 실행 결과를 캐싱하고, 캐싱 된 결괏값을 반환하는 함수이다.
     *
     * @param func - Func는 실행 결괏값을 캐싱 할 함수이다.
     * @returns Func의 실행 결과를 반환한다. 단, 이미 캐싱 된 결괏값이 존재한다면 func 함수를 실행하지 않고 캐싱 된 값을 반환한다.
     */
    _.memoize = function (func) {
        var cache = {};
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = JSON.stringify(args);
            if (!cache.hasOwnProperty(key)) {
                cache[key] = func.apply(this, args);
            }
            return cache[key];
        };
    };
    /**
     * Func로 전달한 함수의 실행을 debouncing을 적용해서 제어하는 함수이다.
     *
     * @param func - Func는 debouncing을 적용할 함수이다.
     * @param wait - Wait은 debouncing을 처리할 시간이다.(ms)
     * @return 익명 함수를 반환한다. 해당 함수를 실행하면 func로 전달한 함수가 debouncing이 적용돼서 실행된다.
     */
    _.debounce = function (func, wait) {
        if (wait === void 0) { wait = 0; }
        var timerId = null;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = window.setTimeout(function () {
                timerId = null;
                return func.apply(_this.args);
            }, wait);
        };
    };
    /**
     * Func로 전달한 함수의 실행을 throttling을 적용해서 제어하는 함수이다.
     *
     * @param func - Func는 throttling을 적용할 함수이다.
     * @param wait - Wait은 throttling 처리할 시간이다.(ms)
     * @return 익명 함수를 반환한다. 해당 함수를 실행하면 func로 전달한 함수가 throttling이 적용돼서 실행된다.
     */
    _.throttle = function (func, wait) {
        if (wait === void 0) { wait = 0; }
        var timerId = null;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timerId) {
                timerId = window.setTimeout(function () {
                    func.apply(_this, args);
                    timerId = null;
                }, wait);
            }
        };
    };
    /**
     * Element로 전달한 요소의 부묘 요소에 click 이벤트를 등록하는 메서드이다.
     *
     * @param element - Element는 대상이 되는 요소이다. 해당 요소의 부모 요소에 click 이벤트를 등록한다.
     * @param callback - Callback은 Element의 부모 요소 click 이벤트에 등록할 메서드이다.
     */
    _.clickOutside = function (element, callback) {
        var parentElement = element.parentElement;
        parentElement.addEventListener('click', function (event) {
            callback(event);
        });
    };
})(_ || (_ = {}));
exports["default"] = _;

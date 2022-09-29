"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
function _(selector) {
  var element = document.querySelector(selector);
  if (element === null)
    throw new Error("Error: there is no element with entered selector.");
  var get = function () {
    return element;
  };
  var innerHTML = function (value) {
    if (value) element.innerHTML = value;
    return element.innerHTML;
  };
  var show = function () {
    if (element instanceof HTMLElement) {
      element.style.display = "block";
    }
  };
  var hidden = function () {
    if (element instanceof HTMLElement) element.style.display = "none";
  };
  var addEvent = function (type, listener) {
    if (element instanceof HTMLElement)
      element.addEventListener(type, listener);
  };
  return {
    get: get,
    innerHTML: innerHTML,
    show: show,
    hidden: hidden,
    addEvent: addEvent,
  };
}
(function (_) {
  function fetch(url, options) {
    if (options !== undefined) return fetch(url, __assign({}, options));
    return fetch(url);
  }
  _.fetch = fetch;
  function isNull(value) {
    return value == null;
  }
  _.isNull = isNull;
  function isNil(value) {
    return value == null || value === undefined;
  }
  _.isNil = isNil;
  function isNumber(value) {
    return typeof value === "number";
  }
  _.isNumber = isNumber;
  function isFunction(value) {
    return typeof value === "function";
  }
  _.isFunction = isFunction;
  function shuffle(array) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return [];
    }
    var index = -1;
    var lastIndex = length - 1;
    var result = __spreadArray([], array, true);
    while (++index < length) {
      var rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      var value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  }
  _.shuffle = shuffle;
  function pick(object, type) {
    if (typeof type === "string") {
      return object.hasOwnProperty(type)
        ? {
            type: object[type],
          }
        : {};
    }
    var newObject = {};
    type.forEach(function (el) {
      if (object.hasOwnProperty(el)) {
        newObject[el] = object[el];
      }
    });
    return newObject;
  }
  _.pick = pick;
  function omit(object, type) {
    var newObject = Object.assign({}, object);
    if (typeof type === "string") {
      if (newObject.hasOwnProperty(type)) {
        delete newObject[type];
      }
      return newObject;
    }
    type.forEach(function (el) {
      if (newObject.hasOwnProperty(el)) {
        delete newObject[el];
      }
    });
    return newObject;
  }
  _.omit = omit;
  function memoize(func) {
    var results = {};
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var key = args.join("");
      if (!results[key]) {
        results[key] = func(args);
      }
      return results[key];
    };
  }
  _.memoize = memoize;
  function debounce(callback, delay) {
    var timer;
    return function (e) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(callback(e), delay);
    };
  }
  _.debounce = debounce;
  function throttle(callback, delay) {
    var waiting = true;
    return function () {
      if (waiting) {
        callback();
        waiting = false;
        setTimeout(function () {
          waiting = true;
        }, delay);
      }
    };
  }
  _.throttle = throttle;
  function clickOutside(element, callback) {
    if (element === null) return;
    element.addEventListener("click", function (e) {
      if (e.target instanceof HTMLElement && !element.contains(e.target)) {
        callback();
      }
    });
  }
  _.clickOutside = clickOutside;
})(_ || (_ = {}));
exports.default = _;

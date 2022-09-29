"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selector_1 = __importDefault(require("./lib/selector"));
const isNull_1 = __importDefault(require("./lib/isNull"));
const isNil_1 = __importDefault(require("./lib/isNil"));
const isNumber_1 = __importDefault(require("./lib/isNumber"));
const isFunction_1 = __importDefault(require("./lib/isFunction"));
const shuffle_1 = __importDefault(require("./lib/shuffle"));
const pick_1 = __importDefault(require("./lib/pick"));
const omit_1 = __importDefault(require("./lib/omit"));
const memoize_1 = __importDefault(require("./lib/memoize"));
const debounce_1 = __importDefault(require("./lib/debounce"));
const throttle_1 = __importDefault(require("./lib/throttle"));
const fetch_1 = __importDefault(require("./lib/fetch"));
const clickOutside_1 = __importDefault(require("./lib/clickOutside"));
const _ = Object.assign(selector_1.default, {
    isNull: isNull_1.default,
    isNil: isNil_1.default,
    isNumber: isNumber_1.default,
    isFunction: isFunction_1.default,
    shuffle: shuffle_1.default,
    pick: pick_1.default,
    omit: omit_1.default,
    memoize: memoize_1.default,
    debounce: debounce_1.default,
    throttle: throttle_1.default,
    fetch: fetch_1.default,
    clickOutside: clickOutside_1.default,
});
exports.default = _;
//# sourceMappingURL=index.default.js.map
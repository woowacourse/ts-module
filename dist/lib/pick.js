"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pick(object, ...keys) {
    return keys.reduce((previous, key) => {
        previous[key] = object[key];
        return previous;
    }, {});
}
exports.default = pick;
//# sourceMappingURL=pick.js.map
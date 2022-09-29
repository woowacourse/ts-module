"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function omit(object, ...keys) {
    const duplicatedObject = Object.assign({}, object);
    keys.forEach((key) => delete duplicatedObject[key]);
    return duplicatedObject;
}
exports.default = omit;
//# sourceMappingURL=omit.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    const $element = document.body.querySelector(selector);
    if (!$element)
        return;
    const setHTML = (html) => {
        $element.innerHTML = html;
    };
    const show = () => {
        $element.style.removeProperty('display');
    };
    const hide = () => {
        $element.style.display = 'none';
    };
    const addEvent = (type, handler) => {
        $element.addEventListener(type, handler);
    };
    return Object.assign($element, {
        setHTML,
        show,
        hide,
        addEvent,
    });
}
exports.default = $;
//# sourceMappingURL=selector.js.map
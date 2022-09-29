"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        const { method = 'GET', headers = {}, body = '' } = options;
        request.open(method, url);
        request.onreadystatechange = () => {
            if (request.readyState !== XMLHttpRequest.DONE)
                return;
            resolve({
                status: 200,
                json: () => new Promise((resolve) => {
                    resolve({ result: '성공' });
                }),
            });
        };
        Object.entries(headers).forEach(([key, value]) => request.setRequestHeader(key, value));
        request.send(body === null || body === void 0 ? void 0 : body.toString());
    });
}
exports.default = fetch;
//# sourceMappingURL=fetch.js.map
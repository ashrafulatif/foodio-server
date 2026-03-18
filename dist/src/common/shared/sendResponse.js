"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (responseData) => {
    const { statusCode, success, message, data, meta } = responseData;
    return {
        statusCode,
        success,
        message,
        data,
        meta,
    };
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=sendResponse.js.map
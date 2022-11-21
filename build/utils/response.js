"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusMessage = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal error'
};
const success = (_req, res, message, data, status) => {
    let statusMsg = message;
    const statusCode = status || 200;
    if (!message) {
        statusMsg = statusMessage[statusCode];
    }
    res.status(statusCode).json({
        data,
        message: statusMsg,
        status: statusCode,
        success: true
    });
};
const error = (_req, res, error, status, details) => {
    const statusCode = status || 500;
    console.log({ errorDetails: details, error, status });
    res.status(statusCode).json(Object.assign(Object.assign({}, error), { status: statusCode, success: false }));
};
exports.default = {
    error,
    success
};

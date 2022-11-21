"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.wrapErrors = void 0;
const config_1 = __importDefault(require("../../config"));
const boom_1 = __importDefault(require("@hapi/boom"));
const response_1 = __importDefault(require("../response"));
const withErrorStack = ({ error, message }, stack) => {
    if (config_1.default.dev) {
        return { error, message, stack };
    }
    return { error, message };
};
const wrapErrors = (err, _req, _res, next) => {
    if (!err.isBoom) {
        next(boom_1.default.badImplementation(err));
    }
    next(err);
};
exports.wrapErrors = wrapErrors;
const errorHandler = (err, req, res, _next) => {
    const { output } = err;
    const { statusCode, payload } = output;
    console.log({ err });
    response_1.default.error(req, res, withErrorStack(payload, err.stack), statusCode, err.details ? err.details[0] : 'Error');
};
exports.errorHandler = errorHandler;

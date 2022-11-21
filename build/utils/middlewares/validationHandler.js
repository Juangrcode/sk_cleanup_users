"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const boom_1 = __importDefault(require("@hapi/boom"));
const validate = (data, schema) => {
    const { error } = joi_1.default.object(schema).validate(data);
    return error;
};
const validationHandler = (schema, check = 'body') => {
    return (req, _res, next) => {
        const error = validate(req[check], schema);
        error ? next(boom_1.default.badRequest(error)) : next();
    };
};
exports.default = validationHandler;

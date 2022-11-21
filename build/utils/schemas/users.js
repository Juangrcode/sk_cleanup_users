"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.userIdSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validations_1 = __importDefault(require("../validations"));
exports.userIdSchema = joi_1.default.string().regex(validations_1.default.mongoId);
const userNameSchema = joi_1.default.string().max(50).regex(validations_1.default.name);
const userEmailSchema = joi_1.default.string().email().regex(validations_1.default.email);
const userPasswordSchema = joi_1.default
    .string()
    .min(8)
    .max(32)
    .regex(validations_1.default.password);
const userPhoneSchema = joi_1.default.string().regex(validations_1.default.phone);
const userReceiveEmailsSchema = joi_1.default.boolean();
exports.createUserSchema = {
    name: userNameSchema.required(),
    email: userEmailSchema.required(),
    password: userPasswordSchema.required(),
    phone: userPhoneSchema,
    receiveEmails: userReceiveEmailsSchema
};
exports.updateUserSchema = {
    name: userNameSchema,
    email: userEmailSchema,
    password: userPasswordSchema,
    phone: userPhoneSchema,
    receiveEmails: userReceiveEmailsSchema
};

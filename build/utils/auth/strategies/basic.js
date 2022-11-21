"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const boom_1 = __importDefault(require("@hapi/boom"));
const users_1 = __importDefault(require("../../../services/users"));
/*
    Authentication with passport usign basic strategy
*/
passport_1.default.use(new passport_http_1.BasicStrategy((email, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.getUserByEmail({ email });
        console.log({ user });
        if (!user) {
            return cb(boom_1.default.unauthorized(), false);
        }
        if (!(yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password))) {
            return cb(boom_1.default.unauthorized(), false);
        }
        delete user.password;
        return cb(null, user);
    }
    catch (err) {
        cb(err, false);
    }
})));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const routes = (server) => {
    server.use('/api/auth', auth_1.default);
    server.use('/api/users', users_1.default);
};
exports.default = routes;

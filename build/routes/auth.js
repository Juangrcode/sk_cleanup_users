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
const express_1 = __importDefault(require("express"));
// Auth
const passport_1 = __importDefault(require("passport"));
// Services
const apiKeys_1 = __importDefault(require("../services/apiKeys"));
const users_1 = __importDefault(require("../services/users"));
const auth_1 = __importDefault(require("../services/auth"));
// Schemas
const users_2 = require("../utils/schemas/users");
// Responses
const boom_1 = __importDefault(require("@hapi/boom"));
const response_1 = __importDefault(require("../utils/response"));
const validationHandler_1 = __importDefault(require("../utils/middlewares/validationHandler"));
// Express
const router = express_1.default.Router();
// Basic strategy middleware
require("../utils/auth/strategies/basic");
// Sign-in
router.post('/sign-in', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
        next(boom_1.default.unauthorized('apiKeyToken is required'));
    }
    // Create passport Authentication, verify if password is the correct
    passport_1.default.authenticate('basic', (err, user) => {
        try {
            if (err || !user) {
                next(boom_1.default.unauthorized());
            }
        }
        catch (err) {
            next(err);
        }
        // If password is succes , We are going to login the user
        req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error || !user) {
                next(error);
            }
            const apiKey = yield apiKeys_1.default.getApiKey({
                token: apiKeyToken
            });
            const { _id: id, name } = user;
            const resultSignIn = yield auth_1.default.signToken({
                id,
                name,
                apiKey
            });
            response_1.default.success(req, res, '', resultSignIn, 200);
        }));
    })(req, res, next);
}));
// Sign-up
router.post('/sign-up', (0, validationHandler_1.default)(users_2.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: user } = req;
    try {
        const existUser = yield users_1.default.getUserByEmail(user);
        if (existUser) {
            return next(boom_1.default.unauthorized('Email already exist'));
        }
        const createdUserId = yield users_1.default.createUser(user);
        response_1.default.success(req, res, 'User created', createdUserId, 200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;

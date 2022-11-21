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
// Services
const users_1 = __importDefault(require("../services/users"));
// Auth
const passport_1 = __importDefault(require("passport"));
// Responses
const boom_1 = __importDefault(require("@hapi/boom"));
const response_1 = __importDefault(require("../utils/response"));
// Schemas
const users_2 = require("../utils/schemas/users");
const validationHandler_1 = __importDefault(require("../utils/middlewares/validationHandler"));
const scopesValidationHandler_1 = __importDefault(require("../utils/middlewares/scopesValidationHandler"));
// Express
const router = express_1.default.Router();
// Middlewares
// JWT Strategy middleware
// Basic strategy middleware
require("../utils/auth/strategies/basic");
/*
   ---------------------- Users Routes ----------------------
*/
// Get user by Email
router.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:users']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield users_1.default.getUserByEmail({ email });
        response_1.default.success(req, res, 'User retrieved', user, 200);
    }
    catch (err) {
        next(err);
    }
}));
// Create User
router.post('/', (0, validationHandler_1.default)(users_2.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: user } = req;
    try {
        const existUser = yield users_1.default.getUserByEmail(user);
        console.log({ existUser });
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
// Update user by ID
router.put('/:userId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['update:users']), (0, validationHandler_1.default)({ userId: users_2.userIdSchema }, 'params'), (0, validationHandler_1.default)(users_2.updateUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { body: user } = req;
    try {
        const updatedUserId = yield users_1.default.updateUser({ userId, user });
        response_1.default.success(req, res, 'User updated', updatedUserId, 200);
    }
    catch (err) {
        next(err);
    }
}));
// Delete user by ID
router.delete('/:userId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['delete:users']), (0, validationHandler_1.default)({ userId: users_2.userIdSchema }, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const deletedUser = yield users_1.default.deleteUser({ userId });
        response_1.default.success(req, res, 'User deleted', deletedUser, 200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;

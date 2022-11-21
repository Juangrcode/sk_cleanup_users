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
exports.deleteUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find(query);
    // const filterUsers = users.map((user: User) => ({
    //   ...user._doc,
    //   password: null
    // }));
    return users || [];
});
const getUserByEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email
    }).exec();
    return user;
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ user, email: user.email });
    const { name, email, password, phone, receiveEmails } = user;
    const saltRounds = 10;
    const hashedPassword = yield bcryptjs_1.default.hash(password || config_1.default.defaultUserPassword, saltRounds);
    const createUser = yield new user_model_1.default({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        receiveEmails
    });
    yield createUser.save();
    return createUser._id;
});
const updateUser = ({ userId, user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password)
        user.password = yield bcryptjs_1.default.hash(user.password, 10);
    yield user_model_1.default.updateOne({
        _id: userId
    }, { $set: user }, { upsert: false });
    return userId;
});
const deleteUser = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteOne({ _id: userId });
    console.log({ userId });
    return userId;
});
exports.deleteUser = deleteUser;
exports.default = {
    getUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser: exports.deleteUser
};

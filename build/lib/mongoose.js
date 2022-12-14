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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const MONGO_URI = `mongodb+srv://${config_1.default.dbUser}:${config_1.default.dbPassword}@${config_1.default.dbHost}/${config_1.default.dbName}?retryWrites=true&w=majority`;
class MongooseLib {
    constructor() { }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            yield mongoose_1.default
                .connect(MONGO_URI, options)
                .then(() => console.log(`[db] Connect success in mongodb+srv://${config_1.default.dbUser}:password@host/${config_1.default.dbName}`))
                .catch((err) => console.error(`[db] ${err}`));
        });
    }
}
exports.default = MongooseLib;

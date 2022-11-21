"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("./lib/mongoose"));
const errorHandler_1 = require("./utils/middlewares/errorHandler");
const notFoundHandler_1 = __importDefault(require("./utils/middlewares/notFoundHandler"));
const app = (0, express_1.default)();
// Connect database
if (module.parent == null) {
    const mongooseLib = new mongoose_1.default();
    mongooseLib.connect();
}
// Middlewares
app.use((0, cors_1.default)(config_1.default.cors));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
(0, routes_1.default)(app);
// Catch 404
app.use(notFoundHandler_1.default);
// Errors middlewares
app.use(errorHandler_1.wrapErrors);
app.use(errorHandler_1.errorHandler);
if (module.parent == null) {
    // Server
    app.listen(config_1.default.port, () => {
        console.log(`Listening in http://localhost:${config_1.default.port}`);
    });
}
exports.default = app;

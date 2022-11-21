"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apiKeySchema = Schema({
    token: String,
    scopes: [String]
}, { versionKey: false });
exports.default = mongoose.model('ApiKey', apiKeySchema, 'api-keys');

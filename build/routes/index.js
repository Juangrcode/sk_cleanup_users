'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const auth_1 = __importDefault(require('./auth'))
// const users = require('./users');
// const repositories = require('./repositories');
const routes = (server) => {
  server.use('/api/auth', auth_1.default)
  // server.use('/api/users', users);
  // server.use('/api/repositories', repositories);
}
exports.default = routes

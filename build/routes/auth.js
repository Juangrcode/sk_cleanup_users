'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
// Express
const router = express_1.default.Router()
// Auth
const passport = require('passport')
// Services
const apiKeysService = require('../services/apiKeys')
const usersService = require('../services/users')
const authService = require('../services/auth')
// Schemas
const { createUserSchema } = require('../utils/schemas/users')
// Responses
const boom = require('@hapi/boom')
const response = require('../utils/response')
// Basic strategy middleware
require('../utils/auth/strategies/basic')
const validation = require('../utils/middlewares/validationHandler')
// Sign-in
router.post('/sign-in', (req, res, next) => __awaiter(void 0, void 0, void 0, function * () {
  const { apiKeyToken } = req.body
  if (!apiKeyToken) {
    next(boom.unauthorized('apiKeyToken is required'))
  }
  // Create passport Authentication, verify if password is the correct
  passport.authenticate('basic', (err, user) => {
    try {
      if (err || !user) {
        next(boom.unauthorized())
      }
    } catch (err) {
      next(err)
    }
    // If password is succes , We are going to login the user
    req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function * () {
      if (error || !user) {
        next(error)
      }
      const apiKey = yield apiKeysService.getApiKey({
        token: apiKeyToken
      })
      const { _id: id, username } = user
      const resultSignIn = yield authService.signToken({
        id,
        username,
        apiKey
      })
      response.success(req, res, '', resultSignIn, 200)
    }))
  })(req, res, next)
}))
// Sign-up
router.post('/sign-up', validation(createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function * () {
  const { body: user } = req
  try {
    const existUser = yield usersService.getUser(user)
    if (existUser._id) {
      next(boom.unauthorized('Username already exist'))
    }
    const createdUserId = yield usersService.createUser({ user })
    response.success(req, res, 'User created', createdUserId, 200)
  } catch (err) {
    next(err)
  }
}))
exports.default = router

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
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose = require('mongoose')
const config = require('../config/index')
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
class MongooseLib {
  constructor () { }
  connect () {
    return __awaiter(this, void 0, void 0, function * () {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
      yield mongoose
        .connect(MONGO_URI, options)
        .then(() => console.log(`[db] Connect success in mongodb+srv://${USER}:password@host/${DB_NAME}`))
        .catch((err) => console.error(`[db] ${err}`))
    })
  }
}
exports.default = MongooseLib

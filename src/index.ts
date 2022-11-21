// Express
import express from 'express'
import cors from 'cors'

import config from './config'
import routes from './routes'
import MongooseLib from './lib/mongoose'

import { wrapErrors, errorHandler } from './utils/middlewares/errorHandler'
import notFoundHandler from './utils/middlewares/notFoundHandler'
const app = express()

// Connect database
if (module.parent == null) {
  const mongooseLib = new MongooseLib()
  mongooseLib.connect()
}

// Middlewares
app.use(cors(config.cors))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
routes(app)

// Catch 404
app.use(notFoundHandler)

// Errors middlewares
app.use(wrapErrors)
app.use(errorHandler)

if (module.parent == null) {
  // Server
  app.listen(config.port, () => {
    console.log(`Listening in http://localhost:${config.port}`)
  })
}

export default app

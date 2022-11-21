import { Express } from 'express'

import auth from './auth'
import users from './users'

const routes = (server: Express) => {
  server.use('/api/auth', auth)
  server.use('/api/users', users)
}

export default routes

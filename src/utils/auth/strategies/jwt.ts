import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from '@hapi/boom'
import moment from 'moment'

import config from '../../../config'
import usersService from '../../../services/users'

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (
      tokenPayload: any,
      cb: (error: unknown | null, result: any) => void
    ) => {
      try {
        const user = await usersService.getUserByEmail({
          email: tokenPayload.email
        })

        if (!user) {
          return cb(boom.unauthorized(), false)
        }

        delete user.password

        if (tokenPayload.exp <= moment().unix()) {
          return cb(boom.unauthorized('El token ha expirado'), false)
        }

        cb(null, { ...user, scopes: tokenPayload.scopes })
      } catch (err) {
        return cb(err, false)
      }
    }
  )
)

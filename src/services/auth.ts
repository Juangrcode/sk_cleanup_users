import config from '../config'

import moment from 'moment'

import jwt from 'jsonwebtoken'

const signToken = async ({
  id,
  name,
  apiKey
}: {
  id: string | undefined
  name: string
  apiKey: {
    scopes: String[]
  }
}) => {
  const payload = {
    sub: id,
    name,
    scopes: apiKey.scopes,
    iat: moment().unix(),
    exp: moment().add(60, 'days').unix()
  }

  // Create JWT with expires
  const token = jwt.sign(payload, config.authJwtSecret)

  return { token, user: { id, name } }
}

export default { signToken }

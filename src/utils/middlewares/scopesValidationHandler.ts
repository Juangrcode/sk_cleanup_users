import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

const scopesValidationHandler = (allowedScopes: [string]) => {
  return (req: Request | any, _res: Response, next: NextFunction) => {
    if (!req.user || !req.user.scopes) {
      next(boom.unauthorized('Missing scopes'))
    }

    const hasAccess = allowedScopes
      .map((allowedScope) => req.user.scopes.includes(allowedScope))
      .find((allowed) => Boolean(allowed))

    if (hasAccess) {
      next()
    } else {
      next(boom.unauthorized('Insufficient scopes'))
    }
  }
}

export default scopesValidationHandler

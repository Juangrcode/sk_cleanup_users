import { NextFunction, Request, Response } from 'express'

import joi from '@hapi/joi'
import boom from '@hapi/boom'

const validate = (data: any, schema: any) => {
  const { error } = joi.object(schema).validate(data)
  return error
}

const validationHandler = (schema: any, check = 'body') => {
  return (req: Request | any, _res: Response, next: NextFunction) => {
    const error: any = validate(req[check], schema)
    error ? next(boom.badRequest(error)) : next()
  }
}

export default validationHandler

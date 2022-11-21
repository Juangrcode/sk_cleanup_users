import { NextFunction, Request, Response } from 'express'

import config from '../../config'
import boom from '@hapi/boom'
import response from '../response'

const withErrorStack = ({ error, message }: any, stack: any): any => {
  if (config.dev) {
    return { error, message, stack }
  }

  return { error, message }
}

export const wrapErrors = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { output } = err
  const { statusCode, payload }: any = output
  console.log({ err })

  response.error(
    req,
    res,
    withErrorStack(payload, err.stack),
    statusCode,
    err.details ? err.details[0] : 'Error'
  )
}

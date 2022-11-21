import { Request, Response } from 'express'

const statusMessage: any = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format',
  500: 'Internal error'
}
const success = (
  _req: Request,
  res: Response,
  message: string,
  data: any,
  status: number
) => {
  let statusMsg = message
  const statusCode = status || 200

  if (!message) {
    statusMsg = statusMessage[statusCode]
  }

  res.status(statusCode).json({
    data,
    message: statusMsg,
    status: statusCode,
    success: true
  })
}

const error = (
  _req: Request,
  res: Response,
  error: Error,
  status: number,
  details: any
) => {
  const statusCode = status || 500
  console.log({ errorDetails: details, error, status })
  res.status(statusCode).json({
    ...error,
    status: statusCode,
    success: false
  })
}

export default {
  error,
  success
}

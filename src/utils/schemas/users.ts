import joi from '@hapi/joi'

import validations from '../validations'

export const userIdSchema = joi.string().regex(validations.mongoId)
const userNameSchema = joi.string().max(50).regex(validations.name)
const userEmailSchema = joi.string().email().regex(validations.email)
const userPasswordSchema = joi
  .string()
  .min(8)
  .max(32)
  .regex(validations.password)
const userPhoneSchema = joi.string().regex(validations.phone)
const userReceiveEmailsSchema = joi.boolean()

interface UserSchema {
  name: joi.StringSchema
  email: joi.StringSchema
  password?: joi.StringSchema
  phone?: joi.StringSchema
  receiveEmails?: joi.BooleanSchema
}

export const createUserSchema: UserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  phone: userPhoneSchema,
  receiveEmails: userReceiveEmailsSchema
}

export const updateUserSchema: UserSchema = {
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
  phone: userPhoneSchema,
  receiveEmails: userReceiveEmailsSchema
}

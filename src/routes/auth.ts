import express, { Request, Response, NextFunction } from 'express';

// Auth
import passport from 'passport';
import { User } from '../interfaces/user.interface';

// Services
import apiKeysService from '../services/apiKeys';
import usersService from '../services/users';
import authService from '../services/auth';

// Schemas
import { createUserSchema } from '../utils/schemas/users';

// Responses
import boom from '@hapi/boom';
import response from '../utils/response';
import validation from '../utils/middlewares/validationHandler';

// Express
const router = express.Router();

// Basic strategy middleware
import '../utils/auth/strategies/basic';

// Sign-in
router.post(
  '/sign-in',
  async (req: Request, res: Response, next: NextFunction) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    // Create passport Authentication, verify if password is the correct
    passport.authenticate('basic', (err: Error, user: User) => {
      try {
        if (err || !user) {
          next(boom.unauthorized());
        }
      } catch (err) {
        next(err);
      }

      // If password is succes , We are going to login the user
      req.login(user, { session: false }, async (error: Error) => {
        if (error || !user) {
          next(error);
        }

        const apiKey = await apiKeysService.getApiKey({
          token: apiKeyToken
        });
        const { _id: id, name } = user;

        const resultSignIn = await authService.signToken({
          id,
          name,
          apiKey
        });

        response.success(req, res, '', resultSignIn, 200);
      });
    })(req, res, next);
  }
);

// Sign-up
router.post(
  '/sign-up',
  validation(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body: user } = req;

    try {
      const existUser = await usersService.getUserByEmail(user);

      if (existUser) {
        return next(boom.unauthorized('Email already exist'));
      }

      const createdUserId = await usersService.createUser(user);

      response.success(req, res, 'User created', createdUserId, 200);
    } catch (err) {
      next(err);
    }
  }
);

export default router;

import express, { Request, Response, NextFunction } from 'express';

// Services
import usersService from '../services/users';

// Auth
import passport from 'passport';

// Responses
import boom from '@hapi/boom';
import response from '../utils/response';

// Schemas
import {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} from '../utils/schemas/users';
import validation from '../utils/middlewares/validationHandler';
import scopesValidationHandler from '../utils/middlewares/scopesValidationHandler';

// Express
const router = express.Router();

// Middlewares
// JWT Strategy middleware
// Basic strategy middleware
import '../utils/auth/strategies/basic';

/*
   ---------------------- Users Routes ----------------------
*/

// Get user by Email
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:users']),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      const user = await usersService.getUserByEmail({ email });

      response.success(req, res, 'User retrieved', user, 200);
    } catch (err) {
      next(err);
    }
  }
);

// Create User
router.post(
  '/',
  validation(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body: user } = req;

    try {
      const existUser = await usersService.getUserByEmail(user);
      console.log({ existUser });
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

// Update user by ID
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:users']),
  validation({ userId: userIdSchema }, 'params'),
  validation(updateUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { body: user } = req;

    try {
      const updatedUserId = await usersService.updateUser({ userId, user });

      response.success(req, res, 'User updated', updatedUserId, 200);
    } catch (err) {
      next(err);
    }
  }
);

// Delete user by ID

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['delete:users']),
  validation({ userId: userIdSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
      const deletedUser = await usersService.deleteUser({ userId });

      response.success(req, res, 'User deleted', deletedUser, 200);
    } catch (err) {
      next(err);
    }
  }
);

export default router;

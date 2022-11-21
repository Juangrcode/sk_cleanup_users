import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcryptjs';
import boom from '@hapi/boom';

import usersService from '../../../services/users';
import { User } from '../../../interfaces/user.interface';

/*
    Authentication with passport usign basic strategy
*/

passport.use(
  new BasicStrategy(
    async (
      email: string,
      password: string,
      cb: (error: unknown | null, user: User | boolean) => void
    ) => {
      try {
        const user: any = await usersService.getUserByEmail({ email });
        console.log({ user });
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        if (!(await bcrypt.compare(password, user?.password))) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        return cb(null, user);
      } catch (err) {
        cb(err, false);
      }
    }
  )
);

import { User } from '../interfaces/user.interface';

import UsersModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import config from '../config';

const getUsers = async (query: User) => {
  const users = await UsersModel.find(query);

  // const filterUsers = users.map((user: User) => ({
  //   ...user._doc,
  //   password: null
  // }));

  return users || [];
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const user = await UsersModel.findOne({
    email
  }).exec();

  return user;
};

const createUser = async (user: User) => {
  console.log({ user, email: user.email });
  const { name, email, password, phone, receiveEmails } = user;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    password || config.defaultUserPassword,
    saltRounds
  );

  const createUser = await new UsersModel({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    receiveEmails
  });

  await createUser.save();

  return createUser._id;
};

const updateUser = async ({ userId, user }: { userId: string; user: User }) => {
  if (user.password) user.password = await bcrypt.hash(user.password, 10);

  await UsersModel.updateOne(
    {
      _id: userId
    },
    { $set: user },
    { upsert: false }
  );
  return userId;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  await UsersModel.deleteOne({ _id: userId });
  console.log({ userId });
  return userId;
};

export default {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};

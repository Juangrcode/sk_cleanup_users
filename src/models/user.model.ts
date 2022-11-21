import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    receiveEmails: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('User', userSchema, 'users');

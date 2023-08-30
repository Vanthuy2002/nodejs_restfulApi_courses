import mongoose, { Schema } from 'mongoose';

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: 'Name must be at least 3 characters',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => regexEmail.test(value),
        message: 'Must be an email',
      },
    },

    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true, autoIndex: true }
);

const MyUsers = mongoose.model('User', User);
export default MyUsers;

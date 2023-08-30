import mongoose, { Schema } from 'mongoose';

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Student = new Schema(
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
      validate: {
        validator: (num) => num.length > 5,
        message: 'Phone must be at least 5 characters',
      },
    },
    age: {
      type: Number,
    },
    languages: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
  },
  { timestamps: true, autoIndex: true }
);

const MyStudents = mongoose.model('Student', Student);
export default MyStudents;

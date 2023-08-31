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
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
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

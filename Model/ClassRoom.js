import mongoose, { Schema } from 'mongoose';

const ClassRoom = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: 'Name must be at least 3 characters',
      },
    },
  },
  { timestamps: true }
);

const MyClass = mongoose.model('Class', ClassRoom);

export default MyClass;

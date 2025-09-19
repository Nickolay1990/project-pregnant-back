import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'I don`t know yet'],
      default: 'I don`t know yet',
      required: true,
    },
    dueDate: {
      type: String,
      validate: {
        validator: function (v) {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!regex.test(v)) {
            return false;
          }

          const dueDate = new Date(v);
          const currentDate = new Date();

          const minDate = new Date(
            currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
          );

          const maxDate = new Date(
            currentDate.getTime() + 40 * 7 * 24 * 60 * 60 * 1000,
          );

          return dueDate >= minDate && dueDate <= maxDate;
        },
        message:
          'dueDate must be in YYYY-MM-DD format and be between 1 and 40 weeks from the current date.',
      },
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);

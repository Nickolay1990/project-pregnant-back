import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { versionKey: false },
);

export const Task = mongoose.model('Task', taskSchema);

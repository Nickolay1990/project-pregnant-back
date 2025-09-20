import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export const Task = mongoose.model('Task', taskSchema);

// src/models/MomState.js
import { Schema, model } from 'mongoose';

const momStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true },
    feelings: {
      states: [String],
      sensationDescr: String,
    },
    comfortTips: [
      {
        category: String,
        tip: String,
      },
    ],
  },
  { versionKey: false },
);

export const MomState = model('MomState', momStateSchema, 'mom_states');

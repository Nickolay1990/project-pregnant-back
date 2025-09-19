// src/models/BabyState.js
import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true },
    analogy: String,
    babySize: Number,
    babyWeight: Number,
    image: String,
    babyActivity: String,
    babyDevelopment: String,
    interestingFact: String,
    momDailyTips: [String],
  },
  { versionKey: false },
);

export const BabyState = model('BabyState', babyStateSchema, 'baby_states');

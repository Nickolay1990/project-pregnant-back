import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const emotionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
},
    {versionKey: false, timestamps: false}
)

export const Emotion = model('Emotion', emotionSchema, 'emotions')
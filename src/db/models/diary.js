import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const diarySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        emotions: [{
            type: Schema.Types.ObjectId, ref: 'Emotion', required: true
        }],
        descr: {
            type: String,
            default: '',
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);
export const Diary = model('Diary', diarySchema, 'diaries')
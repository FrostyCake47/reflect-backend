import mangoose, { Schema, Document, Types } from 'mongoose';
import { IEntry } from './entryModel';

export interface IChapter extends Document {
    uid: string;
    title: string;
    description?: string;
    imageUrl?: string[];
    entryCount: number;
    entries?: [IEntry];
};

const chapterSchema: Schema = new Schema({
    uid: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    imageUrl: [String],
    entryCount: {type: Number, required: true},
    entries: [{
        title: { type: String, required: true },
        content: { type: Array<{ [key: string]: any }> },  // Use dynamic keys for content
        date: { type: Date, required: true },
        tags: { type: [String], required: false }
    }],}, 
    { timestamps: true}
);

const Chapter = mangoose.model<IChapter>('Chapter', chapterSchema);
export default Chapter;

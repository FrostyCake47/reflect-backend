import mangoose, { Schema, Document, Types } from 'mongoose';

export interface IChapter extends Document {
    title: string;
    description?: string;
    imageUrl?: string[];
    entryCount: number;
    entries?: Array<Types.ObjectId>;
};

const chapterSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: String,
    imageUrl: [String],
    entryCount: {type: Number, required: true},
    entries: [{type: Schema.Types.ObjectId, ref: 'Entry'}]
});

const Chapter = mangoose.model<IChapter>('Chapter', chapterSchema);
export default Chapter;

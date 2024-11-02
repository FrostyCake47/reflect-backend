import mangoose, { Schema, Document, Types } from 'mongoose';

export interface IEntry extends Document{
    title: string;
    content?: Array<{ [key:string]:any }>;
    date: Date;
    tags?: Array<{ [key:string]:any }>;
    chapterId: string;
}

const entrySchema: Schema = new Schema({
    title: { type: String, required: true },
    content: [{ type: Map, of: Schema.Types.Mixed }],  // Dynamic content
    date: { type: Date, required: true },
    tags: [{ type: Map, of: Schema.Types.Mixed }],  // Dynamic content
    chapterId: { type: String, required: true }
});

const Entry = mangoose.model<IEntry>('Entry', entrySchema);
export default Entry;
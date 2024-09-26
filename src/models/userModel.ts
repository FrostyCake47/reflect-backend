import mongoose, {Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    chapterIds: [string];
    updateTimestamp: {
        chapters : Date,
        entries: {
            [entryId: string] : Date
        }
    }
}

const userSchema: Schema = new Schema({
    uid: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    chapterIds: [String],
    updateTimestamp : {
        chapters : {type: Date},
        entries: {
            type: Map,
            of: { type: Date }
        }
    }
}, { 
    timestamps: true 
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
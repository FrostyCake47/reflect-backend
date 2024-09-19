import mongoose, {Schema, Document } from 'mongoose';

export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
}

const userSchema: Schema = new Schema({
    uid: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true}
}, { 
    timestamps: true 
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
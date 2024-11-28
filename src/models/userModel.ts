import mongoose, {Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    chapterIds: [string];
    devices: [IDevice];
    updateTimestamp: {
        chapters : Date,
        entriesOfChapter: [{
                chapterId: string,
                updatedAt: Date
        }]
    }
}

const userSchema: Schema = new Schema({
    uid: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    chapterIds: [String],
    devices: [{
        deviceId: {type: String, required: true},
        deviceName: {type: String},
        deviceType: {type: String},
        publicKey: {type: String},
        encryptedKey: {type: String}
    }],
    updateTimestamp : {
        chapters : {type: Date},
        entriesOfChapter: [
            {
              chapterId: { type: String,},
              updatedAt: { type: Date,},
            }
          ]
    }
}, { 
    timestamps: true 
});

export interface IDevice {
    deviceId: string,
    deviceName: string,
    deviceType: string,
    publicKey: string,
    encryptedKey: string
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
import mongoose, {Schema, Document, Types } from 'mongoose';
import timestampService from '../services/timestampService';

export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    chapterIds: [string];
    primaryDevice: IDevice;
    devices: IDevice[];
    encryptionMode: string;
    salt: string;
    keyValidator: string;

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

    encryptionMode: {type: String, default: "unencrypted"},
    
    salt: {type: String},
    keyValidator : {type: String},

    primaryDevice: {
        deviceId: {type: String, required: true},
        deviceName: {type: String},
        deviceType: {type: String},
        publicKey: {
            exponent: {type: String},
            modulus: {type: String},
            testData: {type: String}
        },
        encryptedKey: {type: String}
    },
    devices: [{
        deviceId: {type: String, required: true},
        deviceName: {type: String},
        deviceType: {type: String},
        publicKey: {
            exponent: {type: String},
            modulus: {type: String},
            testData: {type: String}
        },
        encryptedKey: {type: String},
    },
    {timestamps: true}    
    ],
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
    publicKey: {
        exponent: string,
        modulus: string,
        testData: string
    },
    encryptedKey: string
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
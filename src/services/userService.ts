import User, { IDevice, IUser } from '../models/userModel';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return await User.find();
    }

    public async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ uid: id });
    }

    public async createUser(userData: IUser, deviceId: string): Promise<any>  {
        const existingUser = await User.findOne({ uid: userData.uid });
        if (existingUser) {
            //check if current device exist
            for(const _device of existingUser.devices){
                
                if(_device.deviceId === deviceId){
                    console.log(_device.encryptedKey == undefined);
                    console.log(_device.encryptedKey);
                    if(_device.encryptedKey == undefined){
                        return {"code": 2, "message": "no key found"};
                    }
                    else return {"code": 3, "message": "User and Device already exists"};
                }
            }
            existingUser.devices.push({deviceId: deviceId} as IDevice);
            existingUser.save();
            return {"code": 1, "message": "basic device not found but basic added"};
        }
        else {
            console.log("new user $existingUser");
            userData.devices = [{deviceId: deviceId} as IDevice];
            const newUser = new User(userData);
            newUser.save();  // Business logic: Save user to the DB
            return {"code": 0, "message": "1st basic Device and User created"};
        }
    }

    public async updateUserDevice(uid: string, device: IDevice): Promise<void> {
        const user = await User.findOne({uid: uid});
        if(user?.devices){
            user.devices.forEach((_device) => {
                if(_device.deviceId === device.deviceId){
                    _device.deviceName = device.deviceName;
                    _device.deviceType = device.deviceType;
                    _device.publicKey = device.publicKey;
                    _device.encryptedKey = device.encryptedKey;
                }
            })

            user.save();
        }
    }

    public async linkChapterToUser(uid: string, _id: string): Promise<void> {
        //add this _id string to the chapterIds array in the user document
        await User.updateOne({ uid: uid }, { $push: { chapterIds: _id } });
    }

    public async unlinkChapterFromUser(uid: string, _id: string): Promise<void> {
        //remove this _id string from the chapterIds array in the user document
        await User.updateOne({ uid: uid }, { $pull: { chapterIds: _id } });
    }
}

export default new UserService();
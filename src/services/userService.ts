import User, { IDevice, IUser } from '../models/userModel';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return await User.find();
    }

    public async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ uid: id });
    }

    public async createUser(userData: IUser): Promise<String>  {
        const existingUser = await User.findOne({ uid: userData.uid });
        if (existingUser) {
            if(existingUser.devices.includes(userData.devices[0])) return "User already exists";
            else {
                console.log("Adding new device");
                existingUser.devices.push(userData.devices[0]);
                existingUser.save();
                return "User already exists but device added";
            }
        }
        const newUser = new User(userData);
        newUser.save();  // Business logic: Save user to the DB
        return "User created";
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
import User, { IDevice, IUser } from '../models/userModel';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return await User.find();
    }

    public async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ uid: id });
    }

    //code meaning
    //0: new user and primary device created
    //1: user and primary device already exist
    //2: user exist but primary device does not exist
    //3: user exist but current device encrypted key not found
    //4: user and current device already exist
    //5: user exist but current device does not exist but added

    public async createUser(userData: IUser, deviceId: string): Promise<any>  {
        const existingUser = await User.findOne({ uid: userData.uid });
        if (existingUser) {
            //check if primary device exist
            if(existingUser.primaryDevice.deviceId == undefined || existingUser.primaryDevice.deviceId == ""){
                existingUser.primaryDevice = {deviceId: deviceId} as IDevice;
                existingUser.save();
                return {"code": 0, "message": "primary device basic"};
            }

            else if(existingUser.primaryDevice.deviceId === deviceId){
                //check if primary device properly registered
                if(existingUser.primaryDevice.encryptedKey) return {"code": 1, "message": "User and Device already exists", return: existingUser.primaryDevice.encryptedKey};

                //else if primary device does not exist add it
                else{
                    return {"code": 2, "message": "only primary device basic exist no encr"};
                }
            }

            //else its a new device waiting to be connected
            else{
                //check if current device exist
                for(const _device of existingUser.devices){
                    if(_device.deviceId === deviceId){
                        if(_device.encryptedKey == undefined || _device.encryptedKey == ""){
                            return {"code": 3, "message": "no key found"};
                        }
                        else return {"code": 4, "message": "User and Device already exists", encryptedKey: _device.encryptedKey};
                    }
                }
                existingUser.devices.push({deviceId: deviceId} as IDevice);
                existingUser.save();
                return {"code": 5, "message": "basic device not found but basic added"};
            }
            
        }
        else {
            //obiously a new user so create a new user
            userData.primaryDevice = {deviceId: deviceId} as IDevice;
            userData.save(); 
            return {"code": 0, "message": "primary device basic"};
        }
    }

    public async updateUserDevice(uid: string, device: IDevice): Promise<{}> {
        const user = await User.findOne({uid: uid});
        if(user?.primaryDevice.deviceId === device.deviceId){
            user.primaryDevice.deviceName = device.deviceName;
            user.primaryDevice.deviceType = device.deviceType;
            user.primaryDevice.publicKey = {
                exponent: device.publicKey.exponent,
                modulus: device.publicKey.modulus,
                testData: device.publicKey.testData
            };
            user.primaryDevice.encryptedKey = device.encryptedKey;
            user.save();
            return {"message": "Primary Device updated"};
        }

        if(user?.devices){
            user.devices.forEach((_device) => {
                if(_device.deviceId === device.deviceId){
                    _device.deviceName = device.deviceName;
                    _device.deviceType = device.deviceType;
                    _device.publicKey = {
                        exponent: device.publicKey.exponent,
                        modulus: device.publicKey.modulus,
                        testData: device.publicKey.testData
                    };
                    _device.encryptedKey = device.encryptedKey;

                    user.save();
                    return {"message": "Device updated"};
                }
            })
        }

        return {"message": "Device not found"};
    }

    public async linkChapterToUser(uid: string, _id: string): Promise<void> {
        //add this _id string to the chapterIds array in the user document
        await User.updateOne({ uid: uid }, { $push: { chapterIds: _id } });
    }

    public async unlinkChapterFromUser(uid: string, _id: string): Promise<void> {
        //remove this _id string from the chapterIds array in the user document
        await User.updateOne({ uid: uid }, { $pull: { chapterIds: _id } });
    }

    public async getUserDevices(uid: string): Promise<IDevice[]> {
        const user = await User.findOne({ uid: uid });
        var devices: IDevice[] = [];
        if(user?.primaryDevice.deviceId) devices.push(user.primaryDevice);
        if(user?.devices) devices = devices.concat(user.devices);
        return devices;
    }

    public async handleNewDevice(uid: string, deviceId: string, choice: boolean, encryptedKey: string): Promise<IUser | null> {
        const user = await User.findOne({uid});
        if(user?.devices){
            console.log("choice: " + choice + " encryptedKey: " + encryptedKey + " deviceId: " + deviceId);
            for(var i=0; i<user.devices.length; i++){
                if(user.devices[i].deviceId === deviceId){
                    if(choice) user.devices[i].encryptedKey = encryptedKey;
                    else user.devices = user.devices.filter((device) => device.deviceId !== deviceId);
                }
            }
            console.log(user.devices);
            user.save();
            return user;
        }
        return null;
    }
}

export default new UserService();
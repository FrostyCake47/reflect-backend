import User, { IUser } from '../models/userModel';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return await User.find();
    }

    public async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ uid: id });
    }

    public async createUser(userData: IUser): Promise<IUser> {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          throw new Error('User already exists');
        }
    
        const newUser = new User(userData);
        return newUser.save();  // Business logic: Save user to the DB
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
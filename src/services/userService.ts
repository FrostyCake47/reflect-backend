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
}

export default new UserService();
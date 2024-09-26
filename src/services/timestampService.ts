import User, { IUser } from "../models/userModel";

class TimestampService{
    public async getChapterTimestamp(uid: string): Promise<IUser | null>{
        return User.findOne({uid: uid}, {updateTimestamp: 1})
    }

    public async updateChapterTimestamp(uid: string): Promise<IUser | null>{
        return User.findOneAndUpdate({uid: uid}, {updateTimestamp: {chapters: new Date()}}, {new: true})
    }
}

export default new TimestampService;
import User, { IUser } from "../models/userModel";

class TimestampService{
    public async getChapterTimestamp(uid: string): Promise<IUser | null>{
        return User.findOne({uid: uid}, {updateTimestamp: 1})
    }

    public async updateChapterTimestamp(uid: string): Promise<IUser | null>{
        console.log("Updating chapter timestamp for user: " + uid);
        return User.findOneAndUpdate({uid: uid}, {updateTimestamp: {chapters: new Date()}}, {new: true})
    }

    public async updateEntryTimestamp(uid: string, chapterId: string): Promise<IUser | null>{
        return User.findOneAndUpdate({uid: uid, [`updateTimestamp.entriesOfChapter.${chapterId}`]: {$exists: true}}, {[`updateTimestamp.entriesOfChapter.${chapterId}`]: new Date()}, {new: true})
    }

    public async getEntryTimestamp(uid: string, chapterId: string): Promise<Date | null>{
        return User.findOne({uid: uid, [`updateTimestamp.entriesOfChapter.${chapterId}`]: {$exists: true}}, {[`updateTimestamp.entriesOfChapter.${chapterId}`]: 1})
    }
}

export default new TimestampService;
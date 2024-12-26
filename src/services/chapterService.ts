import Chapter, { IChapter } from "../models/chapterModel";
import timestampService from "./timestampService";
import { DateTime } from 'luxon';

class ChapterService{
    public async getChapters(uid: string, date: Date, explicit: boolean): Promise<IChapter[] | null> {
        if(explicit) return await Chapter.find({ uid: uid }).select('-entries');

        const chapterUpdatedAt = await timestampService.getChapterTimestamp(uid).then((user) => {
            if(user){
                return user.updateTimestamp.chapters;
            }
            else{
                return null;
            }
        });
        //console.log("Chapter updated at: " + chapterUpdatedAt + " Date: " + date + " Comparison: " + (chapterUpdatedAt && chapterUpdatedAt > date));
        if(chapterUpdatedAt && chapterUpdatedAt > date) return await Chapter.find({ uid: uid }).select('-entries');
        else return null;
    }

    public async getChapterById(id: string) : Promise<IChapter | null> {
        return await Chapter.findOne({ _id: id });
    }

    public async createChapter(chapterData: IChapter): Promise<IChapter> {
        const newChapter = new Chapter(chapterData);
        return newChapter.save();
    }

    public async updateChapter(chapterData: IChapter, id: string, date: string) : Promise<IChapter | null> {
        const newChapter = new Chapter(chapterData);
        console.log(newChapter);    
        return Chapter.findOneAndUpdate({_id: chapterData._id}, {"$set" : {title: chapterData.title, description: chapterData.description, date: new Date(date)}}, {new: true});
    }

    public async deleteChapter(id: string) : Promise<IChapter | null>{
        return Chapter.findOneAndDelete({_id: id});
    }

    public async incrementEntryCount(id: string) : Promise<IChapter | null>{
        return Chapter.findOneAndUpdate({_id: id}, {$inc: {entryCount: 1}}, {new: true});
    }

    public async decrementEntryCount(id: String) : Promise<IChapter | null>{
        console.log("Decrementing entry count for chapter: " + id);
        return Chapter.findOneAndUpdate({_id: id}, {$inc: {entryCount: -1}}, {new: true});
    }

    public async syncLocalToRemote(uid: string, chapters: IChapter[]): Promise<void> {
        const chapterIds = chapters.map((chapter) => chapter._id);
        await Chapter.deleteMany({ uid: uid, _id: { $nin: chapterIds } });
        await Chapter.insertMany(chapters, { ordered: false });
    }
}

export default new ChapterService();















/*public async updateChapter(uid: string, id: string, chapterData: IChapter): Promise<IChapter | null> {
        return await Chapter.findOneAndUpdate({ uid: uid, _id: id }, chapterData, { new: true });
    }*/
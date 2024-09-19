import Chapter, { IChapter } from "../models/chapterModel";

class ChapterService{
    public async getChapters(uid: string): Promise<IChapter[] | null> {
        return await Chapter.find({ uid: uid });
    }

    public async getChapterById(uid: string, id: string) : Promise<IChapter | null> {
        return await Chapter.findOne({ uid: uid, _id: id });
    }

    public async createChapter(chapterData: IChapter): Promise<IChapter> {
        const newChapter = new Chapter(chapterData);
        return newChapter.save();
    }

    public async updateChapter(chapterData: IChapter, id: string) : Promise<IChapter | null> {
        const newChapter = new Chapter(chapterData);
        return Chapter.findOneAndUpdate({uid: chapterData.uid, _id: id}, newChapter, {new: true});
    }

    public async deleteChapter(uid: string, id: string) : Promise<IChapter | null>{
        return Chapter.findOneAndDelete({uid: uid, _id: id});
    }
}

export default new ChapterService();















/*public async updateChapter(uid: string, id: string, chapterData: IChapter): Promise<IChapter | null> {
        return await Chapter.findOneAndUpdate({ uid: uid, _id: id }, chapterData, { new: true });
    }*/
import Chapter, { IChapter } from "../models/chapterModel";
import { IEntry } from "../models/entryModel";
import chapterService from "./chapterService";


class EntryService{
    public async getEntries(chapterId : string) : Promise<IEntry[] | null>{
        const chapterWithEntries = await Chapter.findById(chapterId).populate<{ entries: IEntry[] }>('entries'); 
        if (chapterWithEntries && chapterWithEntries.entries) {
            return chapterWithEntries.entries as IEntry[];  // Type assertion here
        }
        else{
            throw new Error('Chapter not found');
        }
        return null;
    }

    public async createEntry(entry: IEntry, chapterId: string) : Promise<IEntry>{
        const chapter = await chapterService.getChapterById(chapterId);
        if(chapter){
            if(chapter.entries){
                chapter.entries.push(entry);
            }
            else{
                chapter.entries = [entry];
            }
            chapter.save();
        }
        else{
            throw new Error('Chapter not found');
        }
        return entry;
    }

    public async deleteEntry(chapterId: string, entryId: string) : Promise<IEntry | null>{
        const chapter = await chapterService.getChapterById(chapterId);
        if(chapter){
            if(chapter.entries){
                const entry = chapter.entries.find(e => e._id == entryId);
                if(entry){
                    chapter.entries = chapter.entries.filter(e => e._id != entryId) as [IEntry];
                    chapter.save();
                    return entry;
                }
            }
            else{
                throw new Error('Entry not found');
            }
        }
        else{
            throw new Error('Chapter not found');
        }
        return null;
    }

    public async updateEntry(entry: IEntry, chapterId: string) : Promise<IEntry | null>{
        const chapter = await chapterService.getChapterById(chapterId);
        if(chapter){
            if(chapter.entries){
                const index = chapter.entries.findIndex(e => e._id == entry._id);
                if(index != -1){
                    chapter.entries[index] = entry;
                    chapter.save();
                    return entry;
                }
            }
            else{
                throw new Error('Entry not found');
            }
        }
        else{
            throw new Error('Chapter not found');
        }
        return null;
    }
}

export default new EntryService();
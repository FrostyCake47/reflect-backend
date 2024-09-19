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
}

export default new EntryService();
import { Request, Response } from "express";
import EntryService from "../services/entryService";
import ChapterService from "../services/chapterService";


export const getAllEntriesOfChapter = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {chapterId} = req.params;
        const entries = await EntryService.getEntries(chapterId);

        console.log("Entries found! " + entries);
        res.status(200).json(entries);
    } catch (error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const createEntry = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {entry, chapterId} = req.body;
        const _entry = await EntryService.createEntry(entry, chapterId);
        await ChapterService.incrementEntryCount(chapterId);

        console.log("Entry created! " + _entry);
        res.status(200).json(_entry);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const deleteEntry = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {chapterId, entryId} = req.query;
        console.log("Deleting entry: " + entryId + " for chapter: " + chapterId);
        const entry = await EntryService.deleteEntry(chapterId as string, entryId as string);
        await ChapterService.decrementEntryCount(chapterId as String);

        console.log("Entry deleted! " + entry);
        res.status(200).json(entry);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const updateEntry = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {entry, chapterId} = req.body;
        const _entry = await EntryService.updateEntry(entry, chapterId);

        console.log("Entry updated! " + _entry);
        res.status(200).json(_entry);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}
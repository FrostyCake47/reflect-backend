import { Request, Response } from "express";
import EntryService from "../services/entryService";


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

        console.log("Entry created! " + _entry);
        res.status(200).json(_entry);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}
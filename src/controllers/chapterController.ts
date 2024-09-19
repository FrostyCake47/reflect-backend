import { Request, Response } from "express";
import ChapterService from "../services/chapterService";
import { IChapter } from "../models/chapterModel";
import { error } from "console";


export const getChapters = (req: Request, res: Response) : void => {
    try{
        const {uid} = req.params;
        const chapters = ChapterService.getChapters(uid);
        res.status(200).json(chapters);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const createChapter = (req: Request, res: Response) : void => {
    try{
        const {newChapter} = req.body;
        const chapter = ChapterService.createChapter(newChapter as IChapter)
        res.status(200).json(chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const deleteChapter = (req: Request, res: Response) : void => {
    try {
        const {uid, id} = req.params;
        const chapter = ChapterService.deleteChapter(uid, id);
        res.status(200).json(chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}
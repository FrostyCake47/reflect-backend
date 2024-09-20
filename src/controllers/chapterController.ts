import { Request, Response } from "express";
import ChapterService from "../services/chapterService";
import { IChapter } from "../models/chapterModel";
import { error } from "console";
import userService from "../services/userService";


export const getChapters = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {uid} = req.params;
        const chapters = await ChapterService.getChapters(uid);
        res.status(200).json(chapters);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const createChapter = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {chapter} = req.body;
        const _chapter = await ChapterService.createChapter(chapter as IChapter);
        await userService.linkChapterToUser(chapter.uid, _chapter._id as string);

        console.log("Chapter created! " + _chapter._id);
        res.status(201).json(_chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const deleteChapter = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {uid, id} = req.query;
        console.log("Deleting chapter: " + id + " for user: " + uid);

        const chapter = await ChapterService.deleteChapter(uid as string, id as string);
        await userService.unlinkChapterFromUser(uid as string, id as string);

        console.log("Chapter deleted! " + id);
        res.status(200).json(chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const updateChapter = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {chapter} = req.body;
        const _chapter = await ChapterService.updateChapter(chapter as IChapter, chapter._id as string);

        console.log("Chapter updated! ");
        res.status(200).json(_chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error});
    }
}
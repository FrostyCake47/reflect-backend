import { Request, Response } from "express";
import ChapterService from "../services/chapterService";
import { IChapter } from "../models/chapterModel";
import userService from "../services/userService";
import timestampService from "../services/timestampService";
import { DateTime } from 'luxon';


export const getChapters = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {uid, date} = req.query;
        //console.log("Fetching chapters for user: " + uid + " with date: " + new Date(date as string));
        const chapters = await ChapterService.getChapters(uid as string, new Date(date as string));
        if(chapters){
            //console.log("Chapters fetched! from uid: " + uid);
            res.status(200).json(chapters);
        }
        else{
            //console.log("user already has latest data");
            res.status(304).json({message: "User already has latest data"});
        }
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

        if(_chapter){
            console.log("Chapter created! " + _chapter._id);
            await timestampService.updateChapterTimestamp(chapter.uid);
            res.status(201).json(_chapter);
        }
        else res.status(409).json({message: "Chapter already exists"});
        
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const deleteChapter = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {uid, id} = req.query;
        console.log("Deleting chapter: " + id + " for user: " + uid);

        const chapter = await ChapterService.deleteChapter(id as string);
        await userService.unlinkChapterFromUser(uid as string, id as string);

        if(chapter){
            console.log("Chapter deleted! " + id);
            timestampService.updateChapterTimestamp(uid as string);
            res.status(200).json(chapter);
        }
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const updateChapter = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {chapter} = req.body;
        console.log("Updating chapter: " + JSON.stringify(chapter));
        const _chapter = await ChapterService.updateChapter(chapter as IChapter, chapter.id as string);
        if(_chapter == null){
            res.status(404).json({error: "Chapter not found!"});
            return;
        }
        console.log("Chapter updated! ");
        timestampService.updateChapterTimestamp(chapter.uid);
        res.status(200).json(_chapter);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error});
    }
}
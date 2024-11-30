import { Request, Response } from "express";
import UserService from "../services/userService";
import { IUser } from "../models/userModel";

export const getUsers = (req: Request, res: Response) : void => {
    try{
        const users = UserService.getUsers();
        res.status(200).json(users);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const getUserById = (req: Request, res: Response) : void => {
    try{
        const userId = req.params.id;
        const user = UserService.getUserById(userId);
        res.status(200).json(user);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {uid, name, email, deviceId} = req.body;
        console.log(req.body);
        const iuser: IUser = {uid, name, email} as IUser;

        const newUserMsg = await UserService.createUser(iuser, deviceId);
        if(newUserMsg["code"] == 3) res.status(201).json(newUserMsg);
        else res.status(409).json(newUserMsg);
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const updateUserDevice = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {uid, device} = req.body;
        await UserService.updateUserDevice(uid, device);
        res.status(200).json({message: "Device updated"});
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}
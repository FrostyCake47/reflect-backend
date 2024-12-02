import { Request, Response } from "express";
import UserService from "../services/userService";
import { IUser } from "../models/userModel";
import userService from "../services/userService";

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

export const getUserDevices = async (req: Request, res: Response) : Promise<void> => {
    try{
        const userId = req.params.id;
        console.log(userId);
        const devices = await UserService.getUserDevices(userId);
        console.log(devices);
        res.status(200).json({devices});
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

export const handleNewDevice = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {uid, deviceId, choice, encryptedKey} = req.body;
        console.log(uid + deviceId + choice + encryptedKey);
        console.log("is this even getting exec");
        const user = await userService.handleNewDevice(uid, deviceId, choice, encryptedKey);
        if(user) res.status(200).json(user);
        else res.status(409).json(user);
    } catch(e: any) {
        console.log("error at handleNewDevice: " + e.message);
        res.status(500).json({"error":e.message});
    }
}
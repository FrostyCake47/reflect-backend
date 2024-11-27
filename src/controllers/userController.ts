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
        const {uid, name, email, devices} = req.body;
        console.log(req.body);
        const iuser: IUser = {uid, name, email, devices} as IUser;

        const newUserMsg = await UserService.createUser(iuser);
        if(newUserMsg != "User already exists") res.status(201).json({"message": newUserMsg});
        else res.status(409).json({message: newUserMsg});
    } catch(error: any){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}
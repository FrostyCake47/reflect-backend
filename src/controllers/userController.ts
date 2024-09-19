import { Request, Response } from "express";
import UserService from "../services/userService";
import { IUser } from "../models/userModel";

export const getUsers = (req: Request, res: Response) : void => {
    const users = UserService.getUsers();
    res.status(200).json(users);
}

export const getUserById = (req: Request, res: Response) : void => {
    const userId = req.params.id;
    const user = UserService.getUserById(userId);

    res.status(200).json(user);
}

export const createUser = (req: Request, res: Response) : void => {
    const {uid, name, email } = req.body;
    console.log(req.body);
    const iuser: IUser = {uid, name, email} as IUser;
    const newUser = UserService.createUser(iuser);
    
    res.status(201).json(newUser);
}
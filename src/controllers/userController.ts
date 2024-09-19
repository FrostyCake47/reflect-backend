import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) : void => {
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    res.status(200).json(users);
}

export const getUserById = (req: Request, res: Response) : void => {
    const userId = req.params.id;
    const user = { id: userId, name: 'John Doe' };

    res.status(200).json(user);
}

export const createUser = (req: Request, res: Response) : void => {
    const { name } = req.body;
    const newUser = { id: Date.now(), name };
    
    res.status(201).json(newUser);
}
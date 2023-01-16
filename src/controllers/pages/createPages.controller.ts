import { Request, Response } from "express";
import { createPagesService } from "../../services/pages";
import { ICreatePageRequest } from "../../interfaces/pages.interface";

const createPagesController =async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const pageBody: ICreatePageRequest = req.body
    const data = await createPagesService(pageBody, bookId);
    return res.status(201).json(data);
}

export default createPagesController;
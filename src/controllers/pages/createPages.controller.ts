import { Request, Response } from "express";

const createPagesController =async (req: Request, res: Response) => {
    const bookId = req.params.id;
    //const data = await createPagesService(req.body);
    //return res.status(201).json(data);
    return res.status(420).json({message:`Just chill, work in progress! ${bookId}`})
}

export default createPagesController;
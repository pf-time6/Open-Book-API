import { Request, Response } from "express";
import { showBookService } from "../../services/books";

const showBookController =async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const data = await showBookService(bookId, req.body);
    return res.status(200).json(data);
}

export default showBookController;
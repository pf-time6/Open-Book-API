import { Request, Response } from "express";
import { showPageService } from "../../services/pages";

const showPageController =async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const pageNum = +req.params.page;
    console.log("CHEGO NO CONTROLLER");
    const data = await showPageService(bookId, pageNum);
    return res.status(200).json(data);
}

export default showPageController;
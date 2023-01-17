import { NextFunction, Request, Response } from "express";
import { updateBookService } from "../../services/books";

const updateBookController = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const data = await updateBookService(bookId, req.body);
  return res.status(200).json(data);
};

export default updateBookController;

import { NextFunction, Request, Response } from "express";
import { deleteBookService } from "../../services/books";

const deleteBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.id;
  const data = await deleteBookService(bookId);
  return res.status(201).json(data);
};

export default deleteBookController;

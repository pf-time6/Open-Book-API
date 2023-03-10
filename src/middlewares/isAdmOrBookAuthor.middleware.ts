import { Request, Response, NextFunction } from "express";
import Books from "../entities/books.entity";
import AppDataSource from "../data-source";

const isAdmOrBookAuthorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.id;
  const bookRepo = AppDataSource.getRepository(Books);
  const selectBook = await bookRepo.findOne({
    where: { id: bookId },
    relations: { author: true },
  });
  if (!req.author.isAdm && selectBook.author.id !== req.author.id) {
    return res.status(403).json({ message: "Unauthorized book access." });
  }

  next();
};

export default isAdmOrBookAuthorMiddleware;

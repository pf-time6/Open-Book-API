import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Books from "../entities/books.entity";
import { AppError } from "../errors";

const ensureBookExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.id;

  if (bookId.length < 36) {
    throw new AppError("Book not found", 404);
  }

  const bookRepo = AppDataSource.getRepository(Books);
  const alreadyExistBook = await bookRepo.exist({ where: { id: bookId } });

  if (!alreadyExistBook) {
    throw new AppError("Book not found", 404);
  }

  return next();
};

export default ensureBookExists;

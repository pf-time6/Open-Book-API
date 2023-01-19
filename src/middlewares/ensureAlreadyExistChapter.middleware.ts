import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Books from "../entities/books.entity";
import Pages from "../entities/pages.entity";
import { AppError } from "../errors";

const ensureAlreadyExistChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pagesRepo = AppDataSource.getRepository(Pages);

  const chapterData = req.body;
  const bookId = req.params.id;

  const pageFound = await pagesRepo
    .createQueryBuilder("pages")
    .leftJoinAndSelect("pages.books", "books")
    .where("pages.books = :books", { books: bookId })
    .andWhere("pages.page = :page", { page: chapterData.page })
    .getOne();

  if (pageFound) {
    throw new AppError("Page already registered for this book", 409);
  }

  const chapterFound = await pagesRepo
    .createQueryBuilder("pages")
    .leftJoinAndSelect("pages.books", "books")
    .where("pages.books = :books", { books: bookId })
    .andWhere("pages.chapter = :chapter", { chapter: chapterData.chapter })
    .getOne();


  if (chapterFound) {
    if (chapterData.isChapter)
      throw new AppError("Chapter page not registered", 409);
  }

  return next();
};

export default ensureAlreadyExistChapter;

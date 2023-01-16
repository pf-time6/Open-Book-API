import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
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

  const alreadyExistPage = await pagesRepo.findOne({
    where: { page: chapterData.page },
    relations: { books: true },
  });
  if (alreadyExistPage) {
    if (alreadyExistPage.books.id === bookId) {
      throw new AppError("Page already registered for this book", 409);
    }
  }

  // if (chapterData.isChapter && alreadyExistPage?.books.id === bookId) {
  const alreadyExistChapterNumber = await pagesRepo.findOne({
    where: { chapter: chapterData.chapter },
    relations: { books: true },
  });
  if (!chapterData.isChapter) {
    if (!alreadyExistChapterNumber) {
      throw new AppError("Chapter page not registered", 409);
    }
  }
  if (chapterData.isChapter) {
    const alreadyExistChapterNumber = await pagesRepo.findOne({
      where: { chapter: chapterData.chapter },
      relations: { books: true },
    });
    console.log(alreadyExistChapterNumber);
    if (alreadyExistChapterNumber) {
      throw new AppError("Chapter page already registered for this book", 409);
    }

    const alreadyExistChapterTitle = await pagesRepo.findOne({
      where: { chapterTitle: chapterData.chapterTitle },
      relations: { books: true },
    });

    if (alreadyExistChapterTitle) {
      console.log(alreadyExistChapterTitle);
      if (alreadyExistChapterTitle.books.id === bookId) {
        throw new AppError(
          "Chapter title already registered for this book",
          409
        );
      }
    }
  }
  return next();
};

export default ensureAlreadyExistChapter;

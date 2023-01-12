import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Pages from "../entities/pages.entity";
import { AppError } from "../errors";

const ensureAlreadyExistChapter = async ( req: Request, res: Response, next: NextFunction ) => {
  const chapterRepo = AppDataSource.getRepository(Pages);
  const chapterData = req.body;
  const bookId = req.params.id;

  const alreadyExistPage = await chapterRepo.findOne({where: { page: chapterData.page }, relations:{books:true}});
  if (alreadyExistPage && alreadyExistPage.books.id === bookId) {
    throw new AppError("Page already registered for this book", 409);
  }

  if(chapterData.isChapter && alreadyExistPage.books.id === bookId){
    const alreadyExistChapterNumber = await chapterRepo.findOne({where: { chapter: chapterData.chapter }, relations:{books:true}});
    if (alreadyExistChapterNumber) {
      throw new AppError("Chapter page already registered for this book", 409);
    }
    
    const alreadyExistChapterTitle = await chapterRepo.exist({where: { chapterTitle: chapterData.chapterTitle }, relations:{books:true}});
    if (alreadyExistChapterTitle && alreadyExistPage.books.id === bookId) {
      throw new AppError("Chapter title already registered for this book", 409);
    }
  }
  
  next();
};

export default ensureAlreadyExistChapter
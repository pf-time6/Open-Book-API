import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Pages from "../entities/pages.entity";
import { AppError } from "../errors";

const ensureAlreadyExistChapter = async ( req: Request, res: Response, next: NextFunction ) => {
  const chapterRepo = AppDataSource.getRepository(Pages);
  const chapterData = req.body;

  const alreadyExistPage = await chapterRepo.exist({where: { page: chapterData.page }});
  if (alreadyExistPage) {
    throw new AppError("Page already registered for this book", 409);
  }

  if(chapterData.isChapter){
    const alreadyExistChapterNumber = await chapterRepo.exist({where: { chapter: chapterData.chapter }});
    if (alreadyExistChapterNumber) {
      throw new AppError("Chapter page already registered for this book", 409);
    }
    
    const alreadyExistChapterTitle = await chapterRepo.exist({where: { chapterTitle: chapterData.chapterTitle }});
    if (alreadyExistChapterTitle) {
      throw new AppError("Chapter title already registered for this book", 409);
    }
  }
  
  next();
};

export default ensureAlreadyExistChapter
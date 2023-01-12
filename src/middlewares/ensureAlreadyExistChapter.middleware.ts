import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Pages from "../entities/pages.entity";
import { AppError } from "../errors";

const ensureAlreadyExistChapter = async ( req: Request, res: Response, next: NextFunction ) => {
  const chapterRepo = AppDataSource.getRepository(Pages);
  const alreadyExistChapter = await chapterRepo.exist({where: { chapter: req.body.chapter }});

  if (alreadyExistChapter) {
    throw new AppError("Chapter page already registered for this book", 409);
  }
  
  next();
};

export default ensureAlreadyExistChapter
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Author from "../entities/author.entity";
import { AppError } from "../errors";

const ensureAuthorAdmMiddleware = async ( req: Request,  res: Response, next: NextFunction ) => {
  const authorRepo = AppDataSource.getRepository(Author);
  const authorAdm = await authorRepo.findOneBy({ id: req.author.id });

  if (!authorAdm.isAdm) {
    throw new AppError("non admin user", 403);
  }

  return next();
};

export default ensureAuthorAdmMiddleware

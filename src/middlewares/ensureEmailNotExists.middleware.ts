import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Author from "../entities/author.entity";
import { AppError } from "../errors";

const ensureEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;

  const authorRepo = AppDataSource.getRepository(Author);
  const author = authorRepo.findOne({
    where: {
      email,
    },
  });

  if (!author) {
    throw new AppError("Email not found", 404);
  }

  next();
};

export default ensureEmailExistsMiddleware;

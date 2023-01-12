import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Author from "../entities/author.entity";

const isValidIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorRepo = AppDataSource.getRepository(Author);
  const author = await authorRepo.findOneBy({ id: req.params.id });

  if (!author) {
    return res.status(403).json({ message: "Author not exists" });
  }
  return next();
};

export default isValidIdMiddleware;

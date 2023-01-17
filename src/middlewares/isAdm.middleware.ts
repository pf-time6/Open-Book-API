import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.author.isAdm) {
    return res.status(401).json({ message: "There are no categories found" });
  }
  return next();
};

export default isAdmMiddleware;

import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.author.isAdm) {
    return res.status(403).json({ message: "Haven't permission" });
  }
  return next();
};

export default isAdmMiddleware;

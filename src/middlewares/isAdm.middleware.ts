import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.author.isAdm) {
    return res.status(403).json({ message: "Unauthorized credential" });
  }
  return next();
};

export default isAdmMiddleware;

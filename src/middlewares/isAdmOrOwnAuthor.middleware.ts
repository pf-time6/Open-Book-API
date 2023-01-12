import { Request, Response, NextFunction } from "express";

const isAdmOrOwnAuthorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.author.isAdm && req.params.id !== req.author.id) {
    return res.status(403).json({ message: "Haven't permission" });
  }
  return next();
};

export default isAdmOrOwnAuthorMiddleware;

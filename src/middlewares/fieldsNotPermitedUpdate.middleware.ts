import { NextFunction, Request, Response } from "express";

const fieldsNotPermitedUpdateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ("id" in req.body || "isActive" in req.body || "isAdm" in req.body) {
    return res.status(400).json({ message: "should not be able to update" });
  }
  return next();
};
export default fieldsNotPermitedUpdateMiddleware;

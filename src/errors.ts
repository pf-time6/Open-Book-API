import { Request, Response } from "express";

class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (err: AppError, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  return res.status(500).json({ message: "Internal server error" });
};

export { AppError, errorHandler };

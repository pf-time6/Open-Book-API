import { Request, Response } from "express";
import { ICreateBookRequest } from "../../interfaces/books.interface";
import { createBookService } from "../../services/books";

const createBookController = async (req: Request, res: Response) => {
  const body: ICreateBookRequest = req.body;
  const userId: string = req.author.id;
  const data = await createBookService(body, userId);
  return res.status(201).json(data);
};

export default createBookController;

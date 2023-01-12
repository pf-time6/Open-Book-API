import { Request, Response } from "express";
import { listBooksService } from "../../services/books";

const listBooksController = async (req: Request, res: Response) => {
  const data = await listBooksService();
  return res.status(200).json(data);
};

export default listBooksController;

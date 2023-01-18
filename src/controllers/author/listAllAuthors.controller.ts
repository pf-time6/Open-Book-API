import { Request, Response } from "express";
import { listAllAuthorsService } from "../../services/author";

const listAllAuthorsController = async (req: Request, res: Response) => {
  const data = await listAllAuthorsService(req.author.isAdm);

  return res.status(200).json(data);
};

export default listAllAuthorsController;

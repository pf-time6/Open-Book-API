import { Request, Response } from "express";
import { createAuthorService } from "../../services/author";

const createAuthorController = async (req: Request, res: Response) => {
  console.log(req.body);
  const data = await createAuthorService(req.body);

  return res.status(201).json(data);
};

export default createAuthorController;

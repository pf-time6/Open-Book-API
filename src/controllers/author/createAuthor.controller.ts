import { Request, Response } from "express";
import { createAuthorService } from "../../services/author";

const createAuthorController = async (req: Request, res: Response) => {
  const data = await createAuthorService(req.body);

  return res.status(200).json(data);
};

export default createAuthorController;

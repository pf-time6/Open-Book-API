import { Request, Response } from "express";
import { restoreAuthorService } from "../../services/author";

const restoreAuthorController = async (req: Request, res: Response) => {
  const data = await restoreAuthorService(req.params.id);

  return res.status(201).json(data);
};

export default restoreAuthorController;

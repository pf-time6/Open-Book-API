import { Request, Response } from "express";
import { updateAuthorService } from "../../services/author";

const updateAuthorController = async (req: Request, res: Response) => {
  const data = await updateAuthorService(req.body, req.params.id);

  return res.status(201).json(data);
};

export default updateAuthorController;

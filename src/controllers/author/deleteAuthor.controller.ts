import { Request, Response } from "express";
import { deleteAuthorService } from "../../services/author";

const deleteAuthorController = async (req: Request, res: Response) => {
  const data = await deleteAuthorService(req.params.id);

  return res.status(202).json(data);
};

export default deleteAuthorController;

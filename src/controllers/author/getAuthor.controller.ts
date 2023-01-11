import { Request, Response } from "express";
import { getAuthorService } from "../../services/author";

const getAuthorController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await getAuthorService(id);

  return res.status(200).json(data);
};

export default getAuthorController;

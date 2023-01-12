import { Request, Response } from "express";
import { loginAuthorService } from "../../services/author";

const loginAuthorController = async (req: Request, res: Response) => {
  const authorToken = await loginAuthorService(req.body);

  return res.status(200).json(authorToken);
};

export default loginAuthorController;

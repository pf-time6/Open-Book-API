import { Request, Response } from "express";
import deleteBooksPageService from "../../services/pages/deleteBooksPage.service";

const deleteBooksPageController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const page: number = Number(req.params.page);
  await deleteBooksPageService(id, page);
  return res.status(204).json({});
};

export default deleteBooksPageController;

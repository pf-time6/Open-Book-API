import { Request, Response } from "express";
import { IBookPageEditReq } from "../../interfaces/pages.interface";
import editBookPageService from "../../services/pages/editBookPage.service";

const editBookPageController = async (req: Request, res: Response) => {
  const body: IBookPageEditReq = req.body;
  const id: string = req.params.id;
  const page: number = Number(req.params.page);
  const data = await editBookPageService(body, id, page);
  return res.status(200).json(data);
};

export default editBookPageController;

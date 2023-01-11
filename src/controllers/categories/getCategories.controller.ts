import { Request, Response } from "express";
import { getCategoriesService } from "../../services/categories";

const getCategoriesController = async (req: Request, res: Response) => {
  const categories = await getCategoriesService();
  return res.json(categories);
};

export default getCategoriesController;

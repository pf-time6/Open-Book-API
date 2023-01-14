import { Request, Response } from "express";
import deleteCategoriesService from "../../services/categories/deleteCategories.service";

const deleteCategoiesController = async (req: Request, res: Response) => {
  const deletedCategory = await deleteCategoriesService(req.params.id);
  return res.json(deletedCategory);
};

export default deleteCategoiesController

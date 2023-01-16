import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { ICategoryResponse } from "../../interfaces/categories.interface";

const getCategoriesService = async (): Promise<ICategoryResponse[]> => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  const listCategories = categoriesRepo.find();
  return listCategories;
};

export default getCategoriesService;

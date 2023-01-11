import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { ICategoryRequest } from "../../interfaces/categories.interface";

const createCategoryService = async (categoryData: ICategoryRequest) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const createdCategory = categoryRepo.create(categoryData);
  await categoryRepo.save(createdCategory);
  return createdCategory;
};

export default createCategoryService;

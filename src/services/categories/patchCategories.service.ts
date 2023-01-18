import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories.interface";

const patchCategoriesService = async (
  categoryBody: ICategoryRequest,
  categoryId: number
): Promise<ICategoryResponse> => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  const updatedCategory = await categoriesRepo.findOne({
    where: { id: categoryId },
  });
  const categoryNameFound = await categoriesRepo.findOne({
    where: { name: categoryBody.name },
  });

  console.log(categoryNameFound)

  if (!updatedCategory) {
    throw new AppError("Category not found", 404);
  }
  if (categoryNameFound) {
    throw new AppError("Category already exists", 409);
  }

  const dataCategoryUpdate = categoriesRepo.create({
    ...updatedCategory,
    ...categoryBody,
  });

  await categoriesRepo.save(dataCategoryUpdate);
  return dataCategoryUpdate;
};
export default patchCategoriesService;

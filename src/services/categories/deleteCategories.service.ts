import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors";
import { ICategoryDelete } from "../../interfaces/categories.interface";

const deleteCategoriesService = async (
  idCategory: string
): Promise<ICategoryDelete> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const categoryFound = await categoryRepo.findOneBy({
    id: Number(idCategory),
  });
  if (!categoryFound) {
    throw new AppError("Category not found", 404);
  }
  await categoryRepo.delete(idCategory);
  return { message: "Category deleted" };
};
export default deleteCategoriesService;

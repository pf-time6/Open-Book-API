import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { ICategoryDelete } from "../../interfaces/categories.interface";

const deleteCategoriesService = async (
  idCategory: string
): Promise<ICategoryDelete> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  await categoryRepo.delete(idCategory);
  return { message: "Category deleted" };
};
export default deleteCategoriesService;

import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";

const deleteCategoriesService = async (iCategory: any) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  return await categoryRepo.delete(iCategory);
};
export default deleteCategoriesService;

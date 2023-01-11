import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";

const getCategoriesService = async () => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  const listCategories = categoriesRepo.find();
  return listCategories;
};

export default getCategoriesService;

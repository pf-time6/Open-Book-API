import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";

const deleteCategoriesService = async (idCategory: any) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  await categoryRepo.delete(idCategory);
  return {message:"Category deleted"}
};
export default deleteCategoriesService;

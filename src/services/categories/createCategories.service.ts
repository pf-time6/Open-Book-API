import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors";

const createCategoryService = async (categoryData): Promise<Categories[]> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const createdCategory = categoryRepo.create(categoryData);

  const alreadyExistCategory = await categoryRepo.findOne({
    where: { name: categoryData.name },
  });

  if (alreadyExistCategory) {
    throw new AppError("Category as already registred", 409);
  }
  await categoryRepo.save(createdCategory);

  return createdCategory;
};

export default createCategoryService;

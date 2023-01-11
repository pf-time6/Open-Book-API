import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors";

const createCategoryService = async (categoryData):Promise<Categories[]> => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const createdCategory = categoryRepo.create(categoryData);
  await categoryRepo.save(createdCategory);
  
  const alreadyExistCategory = await categoryRepo.exist({where:{name:categoryData.name}})

  if (alreadyExistCategory) {
    throw new AppError("address as already registred", 409);
  }

  return createdCategory;
};

export default createCategoryService;

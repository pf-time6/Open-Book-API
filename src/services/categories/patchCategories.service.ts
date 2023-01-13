import AppDataSource from "../../data-source"
import Categories from "../../entities/categories.entity"
import { ICategoryRequest } from "../../interfaces/categories.interface"

const patchCategoriesService = async (categoryBody: ICategoryRequest, categoryId: number) => {
    const categoriesRepo = AppDataSource.getRepository(Categories)
    const updatedCategory = await categoriesRepo.findOne({where:{id:categoryId}})

    const dataCategoryUpdate = categoriesRepo.create({
        ...updatedCategory,
        ...categoryBody
        })
 
    await categoriesRepo.save(dataCategoryUpdate)
    return dataCategoryUpdate
}
export default patchCategoriesService
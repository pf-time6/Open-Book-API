import { Request, Response } from "express"
import { ICategoryRequest } from "../../interfaces/categories.interface"
import { patchCategoriesService } from "../../services/categories"


const patchCategoriesController = async(req: Request, res: Response)=>{
    const editedCategory: ICategoryRequest = await patchCategoriesService(req.body, Number(req.params.id))
    return res.json(editedCategory)
}

export default patchCategoriesController
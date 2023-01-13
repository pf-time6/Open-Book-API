import { Request, Response } from "express"
import { patchCategoriesService } from "../../services/categories"


const patchCategoriesController = async(req: Request, res: Response)=>{
    const editedCategory = await patchCategoriesService(req.body, Number(req.params.id))
    return res.json(editedCategory)
}

export default patchCategoriesController
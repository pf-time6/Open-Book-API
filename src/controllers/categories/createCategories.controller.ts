import { Request, Response} from "express";
import { ICategoryRequest } from "../../interfaces/categories.interface";
import { createCategoryService } from "../../services/categories";

const createCategoryController = async (req: Request, res: Response) =>{
    console.log(req.body)
    const categoryData: ICategoryRequest = req.body;
    const newCategory = await createCategoryService(categoryData);
    return res.status(201).json(newCategory)
}

export default createCategoryController
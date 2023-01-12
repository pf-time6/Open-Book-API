import { Request, Response, NextFunction } from "express";
import Books from "../entities/books.entity";
import { AppError } from "../errors";
import AppDataSource from "../data-source";

const isAdmOrBookAuthorMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;
    
    const bookRepo = AppDataSource.getRepository(Books);
    const selectBook = await bookRepo.findOne({where: { id: bookId }, relations:{ author:true }});
    console.log(selectBook);
    
    if (!req.author.isAdm && selectBook.author.id !== req.author.id) {
        return res.status(403).json({ message: "Unauthorized book access." });
    }
    return next();
};

export default isAdmOrBookAuthorMiddleware;

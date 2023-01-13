import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Pages from "../entities/pages.entity";
import { AppError } from "../errors";

const ensurePageExists = async ( req: Request, res: Response, next: NextFunction ) => {
    const bookId = req.params.id;
    const bookPage = +req.params.page;
    const pageRepo = AppDataSource.getRepository(Pages);
    const selectPage = await pageRepo.createQueryBuilder('pages').
    where('pages.books = :books', {books: bookId}).
    andWhere('pages.page = :page', {page: bookPage}).
    getOne();

    if (!selectPage) {
        throw new AppError("Page not found.", 404);
    }

    next();
};

export default ensurePageExists;
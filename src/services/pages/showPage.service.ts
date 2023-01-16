import AppDataSource from "../../data-source";
import Pages from "../../entities/pages.entity";
import { showBookResponseSchema } from "../../schemas/books";

const showPageService = async (bookId: string, pageNum: number) => {
    const pagesRepo = AppDataSource.getRepository(Pages);
    const selectPage = await pagesRepo.createQueryBuilder('pages').
    leftJoinAndSelect('pages.books', 'books').
    where('pages.books = :books', {books: bookId}).
    andWhere('pages.page = :page', {page: pageNum}).
    getOne();

    return selectPage;
};

export default showPageService;

import AppDataSource from "../../data-source";
import Pages from "../../entities/pages.entity";
import { IShowPageResponse } from "../../interfaces/pages.interface";
import showPageResponseSchema from "../../schemas/pages/showPageResponse.schema";

const showPageService = async (
  bookId: string,
  pageNum: number
): Promise<IShowPageResponse> => {
  const pagesRepo = AppDataSource.getRepository(Pages);
  const selectPage = await pagesRepo
    .createQueryBuilder("pages")
    .leftJoinAndSelect("pages.books", "books")
    .where("pages.books = :books", { books: bookId })
    .andWhere("pages.page = :page", { page: pageNum })
    .getOne();

  const pageResponse = await showPageResponseSchema.validate(selectPage, {
    stripUnknown: true,
  });

  return pageResponse;
};

export default showPageService;

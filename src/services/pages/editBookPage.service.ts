import AppDataSource from "../../data-source";
import Pages from "../../entities/pages.entity";
import { AppError } from "../../errors";
import {
  IBookPageEditReq,
  IBookPageEditRes,
} from "../../interfaces/pages.interface";
import editBookPageResponseSchema from "../../schemas/pages/editBookPageResponse.schema";

const editBookPageService = async (
  { content }: IBookPageEditReq,
  id: string,
  page: number
): Promise<IBookPageEditRes> => {
  const pagesRepo = AppDataSource.getRepository(Pages);

  const pageFound = await pagesRepo
    .createQueryBuilder("pages")
    .where("pages.books = :books", { books: id })
    .andWhere("pages.page = :page", { page })
    .getOne();

  if (!pageFound) {
    throw new AppError("Page not found.", 404);
  }

  await pagesRepo
    .createQueryBuilder("pages")
    .leftJoinAndSelect("pages.books", "books")
    .update(Pages)
    .set({ content })
    .where("books.id = :bookId", { bookId: id })
    .andWhere("pages.page = :page", { page })
    .execute();

  const pageRes = await pagesRepo.findOne({
    where: {
      id: pageFound.id,
    },
  });

  const pageResponse = await editBookPageResponseSchema.validate(pageRes, {
    stripUnknown: true,
  });

  return pageResponse;
};

export default editBookPageService;

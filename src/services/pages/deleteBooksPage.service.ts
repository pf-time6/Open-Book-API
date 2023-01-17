import AppDataSource from "../../data-source";
import Pages from "../../entities/pages.entity";
import { AppError } from "../../errors";

const deleteBooksPageService = async (id: string, page: number) => {
  const pagesRepo = AppDataSource.getRepository(Pages);

  const pageFound = await pagesRepo
    .createQueryBuilder("pages")
    .where("pages.books = :books", { books: id })
    .andWhere("pages.page = :page", { page })
    .getOne();

  if (!pageFound) throw new AppError("Page not found.", 404);

  await pagesRepo
    .createQueryBuilder("pages")
    .delete()
    .from(Pages)
    .where("id = :id", { id: pageFound.id })
    .execute();

  return;
};

export default deleteBooksPageService;

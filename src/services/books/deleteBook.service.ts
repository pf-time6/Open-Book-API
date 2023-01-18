import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import Books_Categories from "../../entities/books_categories.entity";
import Pages from "../../entities/pages.entity";

const deleteBookService = async (bookId: string) => {
  const bookRepo = AppDataSource.getRepository(Books);
  const books_categoriesRepo = AppDataSource.getRepository(Books_Categories);
  const pagesRepo = AppDataSource.getRepository(Pages);

  //falta o delete
  await books_categoriesRepo
    .createQueryBuilder("books_categories")
    .leftJoinAndSelect("books_categories.books", "books")
    .delete()
    .where("books.id = :id", { id: bookId })
    .execute();

  await pagesRepo
    .createQueryBuilder("pages")
    .leftJoinAndSelect("pages.books", "books")
    .delete()
    .where("books.id = :id", { id: bookId })
    .execute();

  await bookRepo.delete(bookId);

  return {};
};
export default deleteBookService;

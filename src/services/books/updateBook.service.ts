import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import Books_Categories from "../../entities/books_categories.entity";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors";
import { IUpdateBookRequest } from "../../interfaces";

const updateBookService = async (
  bookId: string,
  payload: IUpdateBookRequest
) => {
  const bookRepo = AppDataSource.getRepository(Books);
  const bookFound = await bookRepo.findOneBy({ id: bookId });

  if (!bookFound) {
    throw new AppError("Book not found", 404);
  }
  const categoriesRepo = AppDataSource.getRepository(Categories);
  const books_categoryRepo = AppDataSource.getRepository(Books_Categories);

  if (
    "title" in payload === false &&
    "about" in payload === false &&
    "category" in payload === false &&
    "coverUrl" in payload === false
  ) {
    throw new AppError("Body is empty", 409);
  }

  if ("category" in payload) {
    const loopCategories = await categoriesRepo
      .createQueryBuilder("categories")
      .where("categories.id IN (:...ids)", { ids: [...payload.category] })
      .getMany();

    if (loopCategories.length !== payload.category.length) {
      throw new AppError(
        `There is at least one category that is not in the database.`,
        404
      );
    }

    await books_categoryRepo
      .createQueryBuilder("books_category")
      .leftJoinAndSelect("books_category.books", "books")
      .delete()
      .where("books.id = :id", { id: bookId })
      .execute();

    const updateBooks = bookRepo.create({ ...bookFound, ...payload });
    await bookRepo.save(updateBooks);

    for (let i = 0; i < loopCategories.length; i++) {
      const books_categories = books_categoryRepo.create({
        books: bookFound,
        categories: loopCategories[i],
      });
      await books_categoryRepo.save(books_categories);
    }

    const relationBookWithCategory = await bookRepo
      .createQueryBuilder("books")
      .leftJoinAndSelect("books.books_categories", "books_categories")
      .leftJoinAndSelect("books_categories.categories", "categories")
      .where("books.id = :id", { id: bookId })
      .getMany();

    return relationBookWithCategory;
  }

  await bookRepo
    .createQueryBuilder("books")
    .update()
    .set({ ...payload })
    .where("books.id = :id", { id: bookId })
    .execute();

  const relationBookWithCategory = await bookRepo
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.books_categories", "books_categories")
    .leftJoinAndSelect("books_categories.categories", "categories")
    .where("books.id = :id", { id: bookId })
    .getMany();

  return relationBookWithCategory;
};
export default updateBookService;

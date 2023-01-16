import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";

const showBookService = async (bookId: string) => {
  const booksRepo = AppDataSource.getRepository(Books);
  const books = await booksRepo
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.pages", "pages")
    .leftJoinAndSelect("books.author", "author")
    .leftJoinAndSelect("books.books_categories", "books_categories")
    .leftJoinAndSelect("books_categories.categories", "categories")
    .where("books.id = :id", { id: bookId })
    .getOne();

  // const booksResponse = await showBookResponseSchema.validate(books, {
  //   stripUnknown: true,
  // });

  return books;
};

export default showBookService;

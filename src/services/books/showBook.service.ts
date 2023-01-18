import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import { IGetBookResposne } from "../../interfaces/books.interface";
import { showBookResponseSchema } from "../../schemas/books";

const showBookService = async (bookId: string): Promise<IGetBookResposne> => {
  const booksRepo = AppDataSource.getRepository(Books);
  const books = await booksRepo
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.pages", "pages")
    .leftJoinAndSelect("books.author", "author")
    .leftJoinAndSelect("books.books_categories", "books_categories")
    .leftJoinAndSelect("books_categories.categories", "categories")
    .where("books.id = :id", { id: bookId })
    .getOne();

  const category = books.books_categories.map((el: any) => el.categories);

  const booksResponse = await showBookResponseSchema.validate(
    { ...books, category },
    {
      stripUnknown: true,
    }
  );

  return booksResponse;
};

export default showBookService;

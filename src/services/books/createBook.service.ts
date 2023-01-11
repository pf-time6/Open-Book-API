import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import Books from "../../entities/books.entity";
import Categories from "../../entities/categories.entity";
import Books_Categories from "../../entities/books_categories.entity";
import { AppError } from "../../errors";
import { ICreateBookRequest } from "../../interfaces/books.interface";

const createBookService = async (body: ICreateBookRequest, userId: string) => {
  const booksRepo = AppDataSource.getRepository(Books);
  const bookFound = await booksRepo.findOne({
    where: {
      title: body.title,
    },
  });

  if (bookFound) {
    throw new AppError("Tittle already exists", 409);
  }

  const authorRepo = AppDataSource.getRepository(Author);
  const authorFound = await authorRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!authorFound) {
    throw new AppError("Author not found", 409);
  }

  const books = booksRepo.create({
    ...body,
    author: authorFound,
  });
  await booksRepo.save(books);

  const categoriesRepo = AppDataSource.getRepository(Categories);
  const bcRepo = AppDataSource.getRepository(Books_Categories);

  // body.category.forEach(async (el) => {
  //   const categories = await categoriesRepo.findOneBy({
  //     id: el,
  //   });

  //   console.log(categories);

  //   if (!categories) {
  //     throw new AppError(
  //       `${el} There is at least one category that is not in the database.`,
  //       404
  //     );
  //   }

  //   const books_categories = bcRepo.create({
  //     books,
  //     categories,
  //   });
  //   await bcRepo.save(books_categories);
  // });

  body.category.map(async (el) => {
    const categories = await categoriesRepo.findOneBy({
      id: el,
    });

    if (!categories) {
      return;
    }

    const books_categories = bcRepo.create({
      books,
      categories,
    });
    await bcRepo.save(books_categories);
  });

  return books;
};

export default createBookService;

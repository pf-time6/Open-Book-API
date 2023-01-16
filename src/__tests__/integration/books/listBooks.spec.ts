import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import Categories from "../../../entities/categories.entity";
import {
  mockedAdminAuthorSession,
  mockedCategoryRequest,
  mockedListBooks,
} from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let authorRepo: Repository<Author>;
  let books_categoriesRepo: Repository<Books_Categories>;
  let categoriesRepo: Repository<Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        authorRepo = conn.getRepository(Author);
        books_categoriesRepo = conn.getRepository(Books_Categories);
        categoriesRepo = conn.getRepository(Categories);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books_categories = await books_categoriesRepo.find();
    const books = await booksRepo.find();
    const categories = await categoriesRepo.find();
    const author = await authorRepo.find();
    await books_categoriesRepo.remove(books_categories);
    await categoriesRepo.remove(categories);
    await booksRepo.remove(books);
    await authorRepo.remove(author);

    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    for await (const book of mockedListBooks) {
      await request(app)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send(book);
    }
    
    const boooks = await booksRepo.find();
    console.log(boooks);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET: /books -> Should be able to list books", async () => {
    const response = await request(app).get(baseUrl);

    // console.log(response.body);
    // const booksResponse = {
    //   status: 200,
    //   bodyLength: mockedListBooks.length,
    //   bodyNotToContain: expect.arrayContaining([
    //     expect.objectContaining({ password: expect.any(String) }),
    //   ]),
    // };

    // expect(response.status).toBe(booksResponse.status);
    // expect(response.body.length).toBe(booksResponse.bodyLength);
    // expect(response.body).not.toContain(booksResponse.bodyNotToContain);
  });

  // it("GET: /books -> Should not be able to list books | empty list", async () => {
  //   const books = await booksRepo.find();
  //   await booksRepo.remove(books);

  //   const response = await request(app).get(baseUrl);

  //   const booksResponse = {
  //     status: 404,
  //     bodyHaveProperty: "message",
  //     bodyStrictEqual: expect.objectContaining({
  //       message: "There are no books found",
  //     }),
  //   };

  //   expect(response.status).toBe(booksResponse.status);
  //   expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
  //   expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  // });
});

import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedBooksUpdateRequest,
  mockedCategoryRequest,
  mockedCategoryRequest2,
  mockedCommonAuthorSession,
  mockedInvalidBodyBooks,
} from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let books_categoriesRepo: Repository<Books_Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        books_categoriesRepo = conn.getRepository(Books_Categories);

        const { authorPayload } = mockedAdminAuthorSession;
        await request(app).post("/author").send(authorPayload);

        const { authorPayload: authorPayload2 } = mockedCommonAuthorSession;
        await request(app).post("/author").send(authorPayload2);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books_categories = await books_categoriesRepo.find();
    const books = await booksRepo.find();
    await books_categoriesRepo.remove(books_categories);
    await booksRepo.remove(books);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("DELETE: /books/:id -> Should be able to delete a book", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .delete(`${baseUrl}/${book.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const expectResults = {
      status: 204,
      bodyStrictEqual: expect.objectContaining({}),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("DELETE: /books/:id -> Should not be able to delete a book | Missing or invalid token", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app).delete(`${baseUrl}/${book.body.id}`);

    const expectResults = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Missing or invalid token",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("DELETE: /books/:id -> Should not be able to delete a book | Book not found", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const response = await request(app)
      .delete(`${baseUrl}/123`)
      .set("Authorization", `Bearer ${token}`);

    const expectResults = {
      status: 404,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Book not found",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("DELETE: /books/:id -> Should not be able to delete a book | Book does not belong to the author", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const { sessionPayload: sessionPayload2 } = mockedCommonAuthorSession;
    const authorLogged2 = await request(app)
      .post("/login")
      .send(sessionPayload2);
    const token2 = authorLogged2.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .delete(`${baseUrl}/${book.body.id}`)
      .set("Authorization", `Bearer ${token2}`);

    const expectResults = {
      status: 403,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Unauthorized book access.",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });
});

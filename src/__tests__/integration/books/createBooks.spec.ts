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
  mockedBooksRequest,
  mockedCategoryRequest,
} from "../../mocks";

describe("Create books route", () => {
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
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("POST: /books -> Should be able to create books", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const booksResponse = {
      status: 201,
      bodyToEqual1: expect.objectContaining(mockedBooksRequest),
      bodyToEqual2: expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toStrictEqual(booksResponse.bodyToEqual1);
    expect(response.body).toStrictEqual(booksResponse.bodyToEqual2);
  });

  it("POST: /books -> ROTA DE ERRO", async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  });

  it("POST: /books -> Should not be able to create books | Invalid body", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const booksResponse = {
      status: 400,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: expect.arrayContaining([
          "title is a required field",
          "category is a required field",
          "about is a required field",
          "coverUrl is a required field",
        ]),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });

  it("POST: /books -> Should not be able to create books | missing token", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    const response = await request(app).post(baseUrl).send(mockedBooksRequest);

    const booksResponse = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "invalid token",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });

  it("POST: /books -> Should not be able to create books | Title already exists", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const booksResponse = {
      status: 409,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Title already registered in the system",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });
});

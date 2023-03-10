import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedCategoryRequest,
  mockedListBooks,
} from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let books_categoriesRepo: Repository<Books_Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        books_categoriesRepo = conn.getRepository(Books_Categories);
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

  it("GET: /books -> Should be able to list books", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    for await (const book of mockedListBooks) {
      await request(app)
        .post(baseUrl)
        .set("Authorization", `Bearer ${token}`)
        .send(book);
    }

    const response = await request(app).get(baseUrl);

    const booksResponse = {
      status: 200,
      bodyLength: mockedListBooks.length,
      bodyNotToContain: expect.arrayContaining([
        expect.objectContaining({
          author: expect.objectContaining({ password: expect.any(String) }),
        }),
      ]),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body.length).toBe(booksResponse.bodyLength);
    expect(response.body).not.toStrictEqual(booksResponse.bodyNotToContain);
  });

  it("GET: /books -> Should not be able to list books | empty list", async () => {
    const response = await request(app).get(baseUrl);

    const booksResponse = {
      status: 404,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "There are no books found",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });

  it("GET: /books:id -> Should be able to list a specific book", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app).get(`${baseUrl}/${book.body.id}`);

    const booksResponse = {
      status: 200,
      bodyStrictEqual2: expect.objectContaining({
        ...mockedBooksRequest,
        id: expect.any(String),
        createdAt: expect.any(String),
        author: expect.objectContaining({
          city: expect.any(String),
          country: expect.any(String),
          email: expect.any(String),
          id: expect.any(String),
          name: expect.any(String),
        }),
        category: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual2);
  });

  it("GET: /books:id -> Should not be able to list books | Book not found", async () => {
    const response = await request(app).get(`${baseUrl}/123`);

    const booksResponse = {
      status: 404,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Book not found",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });
});

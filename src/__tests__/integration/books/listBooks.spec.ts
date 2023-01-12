import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import Books from "../../../entities/books.entity";
import { mockedListBooks } from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let authorRepo: Repository<Author>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books = await booksRepo.find();
    await booksRepo.remove(books);

    for await (const book of mockedListBooks) {
      await booksRepo.save({ ...book });
    }
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET: /books -> Should be able to list books", async () => {
    const response = await request(app).get(baseUrl);

    const booksResponse = {
      status: 200,
      bodyLength: mockedListBooks.length,
      bodyNotToContain: expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ]),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body.length).toBe(booksResponse.bodyLength);
    expect(response.body).not.toContain(booksResponse.bodyNotToContain);
  });

  it("GET: /books -> Should not be able to list books | empty list", async () => {
    const books = await booksRepo.find();
    await booksRepo.remove(books);

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
});

import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import {
  mockedAdminAuthorRequest,
  mockedCommonAuthorRequest,
} from "../../mocks";

describe("Retreieve Author Tests", () => {
  let baseUrl: string = "/author";
  let conn: DataSource;
  let authorRepo: Repository<Author>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
  });

  it("GET: /author -> Should be able to retrieve all Authors", async () => {
    const firstAuthorPayload = mockedCommonAuthorRequest;
    const secondAuthorPayload = mockedAdminAuthorRequest;

    const firstAuthor = authorRepo.create({ ...firstAuthorPayload });
    const secondAuthor = authorRepo.create({ ...secondAuthorPayload });
    await authorRepo.save([firstAuthor, secondAuthor]);

    const response = await request(app).get(baseUrl);

    const expectResults = {
      status: 200,
      bodyToEqual: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          email: expect.any(String),
          name: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
          isAdm: expect.any(Boolean),
          isActive: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          books: expect.any(Array),
        }),
      ]),
      bodyNotToEqual: expect.arrayContaining([
        expect.objectContaining({ password: expect.any(String) }),
      ]),
      bodyToHaveLength: 2,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).not.toEqual(expectResults.bodyNotToEqual);
    expect(response.body).toEqual(expectResults.bodyToEqual);
    expect(response.body).toHaveLength(expectResults.bodyToHaveLength);
  });

  it("GET: /author:id -> Should be able to retrieve an specific Author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).get(`/author/${author.id}`);

    const expectResults = {
      status: 200,
      bodyToEqual: expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        isAdm: expect.any(Boolean),
        isActive: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        books: expect.any(Array),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).not.toHaveProperty(expectResults.bodyNotHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyToEqual);
  });
});

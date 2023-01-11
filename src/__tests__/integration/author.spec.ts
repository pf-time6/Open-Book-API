import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";

//mocks
import { mockedCommonAuthorRequest } from "../mocks";

describe("Author route", () => {
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

  beforeEach(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Must be possible create an User", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const response = await request(app).post(baseUrl).send(authorPayload);

    const routeResponse = {
        status: 201,
        bodyStrictEqual: expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            city: expect.any(String),
            country: expect.any(String),
            isAdm: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        }),
        bodyNotHaveProperty: "password"
    }
    
    expect(response.status).toBe(routeResponse.status);
    expect(response.body).not.toHaveProperty(routeResponse.bodyNotHaveProperty);
    expect(response.body).toStrictEqual(routeResponse.bodyStrictEqual)
  });
});

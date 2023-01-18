import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import Categories from "../../../entities/categories.entity";
import {
  mockedAdminAuthorRequest,
  mockedAdminAuthorSession,
} from "../../mocks";

describe("Retrieve categories tests", () => {
  let baseUrl: string = "/categories";
  let conn: DataSource;
  let authorRepo: Repository<Author>;
  let categoriesRepo: Repository<Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((datasource) => {
        conn = datasource;
        categoriesRepo = conn.getRepository(Categories);
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    const categories = await categoriesRepo.find();
    await categoriesRepo.remove(categories);
  });

  it("GET: /categories -> Should be able to retrieve all categories", async () => {
    const adminAuthorPayload = mockedAdminAuthorRequest;
    const createAdminAuthor = await request(app)
      .post("/author")
      .send(adminAuthorPayload);

    expect(createAdminAuthor.status).toBe(201);

    const loginPayload = mockedAdminAuthorSession.sessionPayload;
    const login = await request(app).post("/login").send(loginPayload);

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    const token: string = login.body.token;

    const fistCategory = { name: "Ficção" };
    const secondCategory = { name: "Ação" };

    const createFirstCategory = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(fistCategory);
    const createSecondCategory = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(secondCategory);

    expect(createFirstCategory.status).toBe(201);
    expect(createSecondCategory.status).toBe(201);

    const response = await request(app).get(baseUrl);

    const expectResults = {
      status: 200,
      bodyToEqual: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ]),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyToEqual);
    expect(response.body).toHaveLength(2);
  });
});

import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import {
  mockedAdminAuthorRequest,
  mockedAdminAuthorSession,
  mockedCommonAuthorRequest,
  mockedCommonAuthorSession,
} from "../../mocks";

describe("Delete Author tests", () => {
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
    const authors = await authorRepo.find({
      withDeleted: true,
    });

    await authorRepo.remove(authors);
  });

  it("DELETE: /author/:id -> Should be able to soft delete any author account with adm permission", async () => {
    const authorPayload = mockedCommonAuthorRequest;
    const admAuthorPayload = mockedAdminAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);

    expect(author.status).toBe(201);
    expect(author.body).toHaveProperty("id");

    const idNotBelonging: string = author.body.id;

    const adminAuthor = await request(app).post(baseUrl).send(admAuthorPayload);

    expect(adminAuthor.status).toBe(201);
    expect(adminAuthor.body).toHaveProperty("id");

    const loginDataAdmin = mockedAdminAuthorSession.sessionPayload;
    const loginAdmin = await request(app).post("/login").send(loginDataAdmin);

    expect(loginAdmin.status).toBe(200);
    expect(loginAdmin.body).toHaveProperty("token");

    const token: string = loginAdmin.body.token;

    const response = await request(app)
      .delete(`${baseUrl}/${idNotBelonging}`)
      .set("Authorization", `Bearer ${token}`);
    const authorsList = await request(app).get(baseUrl);

    expect(response.status).toBe(204);
    expect(authorsList.body).toHaveLength(1);
  });

  it("DELETE: /author/:id -> Should be able to soft delete author's own account", async () => {
    const authorPayload = mockedCommonAuthorRequest;
    const admAuthorPayload = mockedAdminAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);

    expect(author.status).toBe(201);
    expect(author.body).toHaveProperty("id");

    const id: string = author.body.id;

    const loginDataCommonAuthor = mockedCommonAuthorSession.sessionPayload;
    const loginCommonAuthor = await request(app)
      .post("/login")
      .send(loginDataCommonAuthor);

    expect(loginCommonAuthor.status).toBe(200);
    expect(loginCommonAuthor.body).toHaveProperty("token");

    const tokenCommonAuthor: string = loginCommonAuthor.body.token;

    const adminAuthor = await request(app).post(baseUrl).send(admAuthorPayload);

    expect(adminAuthor.status).toBe(201);
    expect(adminAuthor.body).toHaveProperty("id");

    const loginDataAdmin = mockedAdminAuthorSession.sessionPayload;
    const loginAdmin = await request(app).post("/login").send(loginDataAdmin);

    expect(loginAdmin.status).toBe(200);
    expect(loginAdmin.body).toHaveProperty("token");

    const response = await request(app)
      .delete(`${baseUrl}/${id}`)
      .set("Authorization", `Bearer ${tokenCommonAuthor}`);

    expect(response.status).toBe(204);

    const authorsList = await request(app).get(baseUrl);

    expect(authorsList.body).toHaveLength(1);
  });

  it("DELETE: /author/:id -> Should not be able to delete an Author with invalid id", async () => {
    const admAuthorPayload = mockedAdminAuthorRequest;
    const adminAuthor = await request(app).post(baseUrl).send(admAuthorPayload);

    expect(adminAuthor.status).toBe(201);
    expect(adminAuthor.body).toHaveProperty("id");

    const loginDataAdmin = mockedAdminAuthorSession.sessionPayload;
    const loginAdmin = await request(app).post("/login").send(loginDataAdmin);

    expect(loginAdmin.status).toBe(200);
    expect(loginAdmin.body).toHaveProperty("token");

    const token: string = loginAdmin.body.token;

    const response = await request(app)
      .delete(`${baseUrl}/ff9421db-666a-4ba9-99e4-33f2d0ed13fd`)
      .set("Authorization", `Bearer ${token}`);

    const expectResults = {
      status: 404,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("DELETE: /author/:id -> Should not be able to delete an Author without token", async () => {
    const admAuthorPayload = mockedAdminAuthorRequest;
    const adminAuthor = await request(app).post(baseUrl).send(admAuthorPayload);

    expect(adminAuthor.status).toBe(201);
    expect(adminAuthor.body).toHaveProperty("id");

    const loginDataAdmin = mockedAdminAuthorSession.sessionPayload;
    const loginAdmin = await request(app).post("/login").send(loginDataAdmin);

    expect(loginAdmin.status).toBe(200);
    expect(loginAdmin.body).toHaveProperty("token");

    const response = await request(app).delete(`${baseUrl}/ff9421db-666a-4ba9-99e4-33f2d0ed13fd`);

    const expectResults = {
      status: 401,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });
});

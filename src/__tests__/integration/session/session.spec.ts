import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import {
  mockedAdminAuthorSession,
  mockedCommonAuthorSession,
  mockedInvalidBodySession,
  mockedInvalidEmailSession,
  mockedInvalidPasswordSession,
} from "../../mocks";

describe("Create session route", () => {
  let baseUrl: string = "/login";
  let conn: DataSource;
  let authorRepo: Repository<Author>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Should be able to login as admin author", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).post(baseUrl).send(sessionPayload);

    const adminResponse = {
      status: 200,
      bodyHaveProperty: "token",
      bodyStrictEqual: expect.objectContaining({ token: expect.any(String) }),
    };

    expect(response.status).toBe(adminResponse.status);
    expect(response.body).toHaveProperty(adminResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(adminResponse.bodyStrictEqual);
  });

  it("Should be able to login as common author", async () => {
    const { authorPayload, sessionPayload } = mockedCommonAuthorSession;
    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).post(baseUrl).send(sessionPayload);

    const adminResponse = {
      status: 200,
      bodyHaveProperty: "token",
      bodyStrictEqual: expect.objectContaining({ token: expect.any(String) }),
    };

    expect(response.status).toBe(adminResponse.status);
    expect(response.body).toHaveProperty(adminResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(adminResponse.bodyStrictEqual);
  });

  it("Should not be able to login | Invalid body", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedInvalidBodySession);

    const commonAuthorResponse = {
      status: 400,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: expect.arrayContaining([
          "email is a required field",
          "password is a required field",
        ]),
      }),
    };

    expect(response.status).toBe(commonAuthorResponse.status);
    expect(response.body).toHaveProperty(commonAuthorResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(commonAuthorResponse.bodyStrictEqual);
  });

  it("Should not be able to login | Invalid email", async () => {
    const { authorPayload, sessionPayload } = mockedInvalidEmailSession;
    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).post(baseUrl).send(sessionPayload);

    const commonAuthorResponse = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Email or password invalid",
      }),
    };

    expect(response.status).toBe(commonAuthorResponse.status);
    expect(response.body).toHaveProperty(commonAuthorResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(commonAuthorResponse.bodyStrictEqual);
  });

  it("Should not be able to login | Invalid password", async () => {
    const { authorPayload, sessionPayload } = mockedInvalidPasswordSession;
    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).post(baseUrl).send(sessionPayload);

    const commonAuthorResponse = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Email or password invalid",
      }),
    };

    expect(response.status).toBe(commonAuthorResponse.status);
    expect(response.body).toHaveProperty(commonAuthorResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(commonAuthorResponse.bodyStrictEqual);
  });
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = __importDefault(require("../../data-source"));
const author_entity_1 = __importDefault(require("../../entities/author.entity"));
const mocks_1 = require("../mocks");
describe("Create session route", () => __awaiter(void 0, void 0, void 0, function* () {
    let baseUrl = "/login";
    let conn;
    let authorRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((dataSource) => {
            conn = dataSource;
            authorRepo = conn.getRepository(author_entity_1.default);
        })
            .catch((err) => console.log(err));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const authors = yield authorRepo.find();
        yield authorRepo.remove(authors);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield conn.destroy();
    }));
    it("Should be able to login as admin author", () => __awaiter(void 0, void 0, void 0, function* () {
        const { authorPayload, sessionPayload } = mocks_1.mockedAdminAuthorSession;
        const author = authorRepo.create(Object.assign({}, authorPayload));
        yield authorRepo.save(author);
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(sessionPayload);
        const adminResponse = {
            status: 200,
            bodyHaveProperty: "token",
            bodyStrictEqual: expect.objectContaining({ token: expect.any(String) }),
        };
        expect(response.status).toBe(adminResponse.status);
        expect(response.body).toHaveProperty(adminResponse.bodyHaveProperty);
        expect(response.body).toStrictEqual(adminResponse.bodyStrictEqual);
    }));
    it("Should be able to login as common author", () => __awaiter(void 0, void 0, void 0, function* () {
        const { authorPayload, sessionPayload } = mocks_1.mockedCommonAuthorSession;
        const author = authorRepo.create(Object.assign({}, authorPayload));
        yield authorRepo.save(author);
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(sessionPayload);
        const adminResponse = {
            status: 200,
            bodyHaveProperty: "token",
            bodyStrictEqual: expect.objectContaining({ token: expect.any(String) }),
        };
        expect(response.status).toBe(adminResponse.status);
        expect(response.body).toHaveProperty(adminResponse.bodyHaveProperty);
        expect(response.body).toStrictEqual(adminResponse.bodyStrictEqual);
    }));
    it("Should not be able to login | Invalid body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.mockedInvalidBodySession);
        const commonAuthorResponse = {
            status: 400,
            bodyHaveProperty: "message",
            bodyStrictEqual: expect.objectContaining({
                message: expect.arrayContaining([
                    "Email is a required field",
                    "password is a required field",
                ]),
            }),
        };
        expect(response.status).toBe(commonAuthorResponse.status);
        expect(response.body).toHaveProperty(commonAuthorResponse.bodyHaveProperty);
        expect(response.body).toStrictEqual(commonAuthorResponse.bodyStrictEqual);
    }));
    it("Should not be able to login | Invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { authorPayload, sessionPayload } = mocks_1.mockedInvalidEmailSession;
        const author = authorRepo.create(Object.assign({}, authorPayload));
        yield authorRepo.save(author);
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(sessionPayload);
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
    }));
    it("Should not be able to login | Invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const { authorPayload, sessionPayload } = mocks_1.mockedInvalidPasswordSession;
        const author = authorRepo.create(Object.assign({}, authorPayload));
        yield authorRepo.save(author);
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(sessionPayload);
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
    }));
}));
//# sourceMappingURL=session.spec.js.map
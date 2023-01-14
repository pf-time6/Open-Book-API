"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedInvalidPasswordSession = exports.mockedInvalidEmailSession = exports.mockedInvalidBodySession = exports.mockedCommonAuthorSession = exports.mockedAdminAuthorSession = void 0;
const index_1 = require("../index");
const mockedAdminAuthorSession = {
    authorPayload: index_1.mockedAdminAuthorRequest,
    sessionPayload: {
        email: index_1.mockedAdminAuthorRequest.email,
        password: index_1.mockedAdminAuthorRequest.password,
    },
};
exports.mockedAdminAuthorSession = mockedAdminAuthorSession;
const mockedCommonAuthorSession = {
    authorPayload: index_1.mockedCommonAuthorRequest,
    sessionPayload: {
        email: index_1.mockedCommonAuthorRequest.email,
        password: index_1.mockedCommonAuthorRequest.password,
    },
};
exports.mockedCommonAuthorSession = mockedCommonAuthorSession;
const mockedInvalidBodySession = {};
exports.mockedInvalidBodySession = mockedInvalidBodySession;
const mockedInvalidEmailSession = {
    authorPayload: index_1.mockedCommonAuthorRequest,
    sessionPayload: {
        email: "mail@mail.com",
        password: index_1.mockedCommonAuthorRequest.password,
    },
};
exports.mockedInvalidEmailSession = mockedInvalidEmailSession;
const mockedInvalidPasswordSession = {
    authorPayload: index_1.mockedCommonAuthorRequest,
    sessionPayload: {
        email: index_1.mockedCommonAuthorRequest.email,
        password: "invalidPassword",
    },
};
exports.mockedInvalidPasswordSession = mockedInvalidPasswordSession;
//# sourceMappingURL=session.mocks.js.map
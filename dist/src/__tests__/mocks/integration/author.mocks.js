"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedAdminAuthorResponse = exports.mockedAdminAuthorRequest = exports.mockedCommonAuthorResponse = exports.mockedCommonAuthorRequest = void 0;
const mockedCommonAuthorRequest = {
    name: "commonUser",
    email: "common@gmail.com",
    password: "123123",
    city: "Rio de janeiro",
    country: "Brasil",
};
exports.mockedCommonAuthorRequest = mockedCommonAuthorRequest;
const mockedCommonAuthorResponse = {
    name: "commonUser",
    email: "common@gmail.com",
    city: "Rio de janeiro",
    country: "Brasil",
};
exports.mockedCommonAuthorResponse = mockedCommonAuthorResponse;
const mockedAdminAuthorRequest = {
    name: "adminUser",
    email: "admin123@gmail.com",
    isAdm: true,
    password: "123123",
    city: "Rio de janeiro",
    country: "Brasil",
};
exports.mockedAdminAuthorRequest = mockedAdminAuthorRequest;
const mockedAdminAuthorResponse = {
    name: "adminUser",
    email: "admin123@gmail.com",
    isAdm: true,
    city: "Rio de janeiro",
    country: "Brasil",
};
exports.mockedAdminAuthorResponse = mockedAdminAuthorResponse;
//# sourceMappingURL=author.mocks.js.map
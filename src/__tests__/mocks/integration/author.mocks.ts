import {
  ICreateUserRequest,
  IOmitUserPassword,
} from "../../../interfaces/author.interface";

const mockedCommonAuthorRequest: ICreateUserRequest = {
  name: "commonUser",
  email: "common@gmail.com",
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedCommonAuthorResponse: IOmitUserPassword = {
  name: "commonUser",
  email: "common@gmail.com",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminAuthorRequest: ICreateUserRequest = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdmin: true,
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminAuthorResponse: IOmitUserPassword = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdmin: true,
  city: "Rio de janeiro",
  country: "Brasil",
};

export {
  mockedCommonAuthorRequest,
  mockedCommonAuthorResponse,
  mockedAdminAuthorRequest,
  mockedAdminAuthorResponse,
};

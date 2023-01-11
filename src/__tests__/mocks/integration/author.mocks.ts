import { ICreateAuthorRequest, IOmitAuthorPassword } from "../../../interfaces";

const mockedCommonAuthorRequest: ICreateAuthorRequest = {
  name: "commonUser",
  email: "common@gmail.com",
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedCommonAuthorResponse: IOmitAuthorPassword = {
  name: "commonUser",
  email: "common@gmail.com",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminAuthorRequest: ICreateAuthorRequest = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdm: true,
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminAuthorResponse: IOmitAuthorPassword = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdm: true,
  city: "Rio de janeiro",
  country: "Brasil",
};

export {
  mockedCommonAuthorRequest,
  mockedCommonAuthorResponse,
  mockedAdminAuthorRequest,
  mockedAdminAuthorResponse,
};

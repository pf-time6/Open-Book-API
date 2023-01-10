import {
  ICreateUserRequest,
  IOmitUserPassword,
} from "../../../interfaces/author.interface";

const mockedCommonUserRequest: ICreateUserRequest = {
  name: "commonUser",
  email: "common@gmail.com",
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedCommonUserResponse: IOmitUserPassword = {
  name: "commonUser",
  email: "common@gmail.com",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminUserRequest: ICreateUserRequest = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdmin: true,
  password: "123123",
  city: "Rio de janeiro",
  country: "Brasil",
};

const mockedAdminUserResponse: IOmitUserPassword = {
  name: "adminUser",
  email: "admin123@gmail.com",
  isAdmin: true,
  city: "Rio de janeiro",
  country: "Brasil",
};

export {
  mockedCommonUserRequest,
  mockedCommonUserResponse,
  mockedAdminUserRequest,
  mockedAdminUserResponse,
};

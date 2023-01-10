import { ICreateSessionRequest } from "../../../interfaces/session.interface";
import {
  mockedAdminAuthorRequest,
  mockedCommonAuthorRequest,
} from "./author.mocks";

const mockedAdminAuthorSession: ICreateSessionRequest = {
  email: mockedAdminAuthorRequest.email,
  password: mockedAdminAuthorRequest.password,
};

const mockedCommonAuthorSession: ICreateSessionRequest = {
  email: mockedCommonAuthorRequest.email,
  password: mockedCommonAuthorRequest.password,
};

const mockedInvalidBodySession: object = {};

const mockedInvalidEmailSession: ICreateSessionRequest = {
  email: "mail@gmail.com",
  password: mockedCommonAuthorRequest.password,
};

const mockedInvalidPasswordSession: ICreateSessionRequest = {
  email: mockedCommonAuthorRequest.email,
  password: "Password Invalid",
};

export {
  mockedAdminAuthorSession,
  mockedCommonAuthorSession,
  mockedInvalidBodySession,
  mockedInvalidEmailSession,
  mockedInvalidPasswordSession,
};

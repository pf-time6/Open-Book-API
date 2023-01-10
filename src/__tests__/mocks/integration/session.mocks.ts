import { ICreateSessionRequest } from "../../../interfaces/session.interface";
import {
  mockedAdminUserRequest,
  mockedCommonUserRequest,
} from "./author.mocks";

const mockedAdminUserSession: ICreateSessionRequest = {
  email: mockedAdminUserRequest.email,
  password: mockedAdminUserRequest.password,
};

const mockedCommonUserSession: ICreateSessionRequest = {
  email: mockedCommonUserRequest.email,
  password: mockedCommonUserRequest.password,
};

const mockedInvalidBodySession: object = {};

const mockedInvalidEmailSession: ICreateSessionRequest = {
  email: "mail@gmail.com",
  password: mockedCommonUserRequest.password,
};

const mockedInvalidPasswordSession: ICreateSessionRequest = {
  email: mockedCommonUserRequest.email,
  password: "Password Invalid",
};

export {
  mockedAdminUserSession,
  mockedCommonUserSession,
  mockedInvalidBodySession,
  mockedInvalidEmailSession,
  mockedInvalidPasswordSession,
};

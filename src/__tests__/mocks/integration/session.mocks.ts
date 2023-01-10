import { ICreateSessionPayloadMock } from "../../../interfaces/mock.interface";
import { ICreateSessionRequest } from "../../../interfaces/sessions.interface";
import {
  mockedAdminAuthorRequest,
  mockedCommonAuthorRequest,
} from "./author.mocks";

const mockedAdminAuthorSession: ICreateSessionPayloadMock = {
  authorPayload: mockedAdminAuthorRequest,
  sessionPayload: {
    email: mockedAdminAuthorRequest.email,
    password: mockedAdminAuthorRequest.password,
  },
};

const mockedCommonAuthorSession: ICreateSessionPayloadMock = {
  authorPayload: mockedCommonAuthorRequest,
  sessionPayload: {
    email: mockedCommonAuthorRequest.email,
    password: mockedCommonAuthorRequest.password,
  },
};

const mockedInvalidBodySession: object = {};

const mockedInvalidEmailSession: ICreateSessionPayloadMock = {
  authorPayload: mockedCommonAuthorRequest,
  sessionPayload: {
    email: "mail@mail.com",
    password: mockedCommonAuthorRequest.password,
  },
};

const mockedInvalidPasswordSession: ICreateSessionPayloadMock = {
  authorPayload: mockedCommonAuthorRequest,
  sessionPayload: {
    email: mockedCommonAuthorRequest.email,
    password: "invalidPassword",
  },
};

export {
  mockedAdminAuthorSession,
  mockedCommonAuthorSession,
  mockedInvalidBodySession,
  mockedInvalidEmailSession,
  mockedInvalidPasswordSession,
};

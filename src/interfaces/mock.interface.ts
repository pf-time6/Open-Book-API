import { ICreateAuthorRequest, ICreateSessionRequest } from "./index";

interface ICreateSessionPayloadMock {
  authorPayload: ICreateAuthorRequest;
  sessionPayload: ICreateSessionRequest;
}

interface ICreateSessionPayloadMock2 {
  authorPayload2: ICreateAuthorRequest;
  sessionPayload2: ICreateSessionRequest;
}

export { ICreateSessionPayloadMock, ICreateSessionPayloadMock2 };

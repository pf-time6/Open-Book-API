import { ICreateAuthorRequest, ICreateSessionRequest } from "./index";

interface ICreateSessionPayloadMock {
  authorPayload: ICreateAuthorRequest;
  sessionPayload: ICreateSessionRequest;
}

export { ICreateSessionPayloadMock };

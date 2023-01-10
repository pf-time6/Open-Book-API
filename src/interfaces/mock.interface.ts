import { ICreateUserRequest } from "./author.interface";
import { ICreateSessionRequest } from "./sessions.interface";

interface ICreateSessionPayloadMock {
  authorPayload: ICreateUserRequest;
  sessionPayload: ICreateSessionRequest;
}

export { ICreateSessionPayloadMock };

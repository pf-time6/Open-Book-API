import { StringDecoder } from "string_decoder";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
  isAdmin?: boolean;
}

interface IOmitUserPassword extends Omit<ICreateUserRequest, "password"> {}

interface ICreateUserResponse extends IOmitUserPassword {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

export { ICreateUserRequest, IOmitUserPassword, ICreateUserResponse };

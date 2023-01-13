import { ICreateBookResponse } from "./books.interface";

//POST
//  REQUEST
interface ICreateAuthorRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
  isAdm?: boolean;
}

interface IOmitAuthorPassword extends Omit<ICreateAuthorRequest, "password"> {}

interface ICreateAuthorResponse extends IOmitAuthorPassword {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

//  RESPONSE
interface IAuthorWithBooksResponse extends ICreateAuthorResponse {
  books: Omit<ICreateBookResponse, "category">[];
}

//LOGIN
//  REQUEST
interface ILoginAuthor {
  email: string;
  password: string;
}

//UPDATE
//  REQUEST
interface IAuthorUpdateRequest {
  name?: string;
  password?: string;
  city?: string;
  country?: string;
}
//  RESPONSE
interface IUpdateAuthorResponse extends ICreateAuthorResponse {
  deletedAt?: Date;
}

//DELETE
//  RESPONSE
interface IDeleteAuthorResponse {
  deleted?: IUpdateAuthorResponse;
  restored?: IUpdateAuthorResponse;
}

export {
  ICreateAuthorRequest,
  IOmitAuthorPassword,
  ICreateAuthorResponse,
  ILoginAuthor,
  IAuthorWithBooksResponse,
  IAuthorUpdateRequest,
  IUpdateAuthorResponse,
  IDeleteAuthorResponse,
};

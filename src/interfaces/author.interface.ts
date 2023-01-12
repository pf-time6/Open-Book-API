import { ICreateBookResponse } from "./books.interface";

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

interface IAuthorWithBooksResponse extends ICreateAuthorResponse {
  books: Omit<ICreateBookResponse, "category">[];
}

interface ILoginAuthor {
  email: string;
  password: string;
}

export {
  ICreateAuthorRequest,
  IOmitAuthorPassword,
  ICreateAuthorResponse,
  ILoginAuthor,
  IAuthorWithBooksResponse,
};

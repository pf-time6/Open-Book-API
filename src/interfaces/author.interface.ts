import { ICreateBookResponse } from "./books.interface";

//CREATE
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

//RESPONSE GET AUTHOR
interface IAuthorWithBooksResponse extends ICreateAuthorResponse {
  books: Omit<ICreateBookResponse, "category">[];
}

//LOGIN
interface ILoginAuthor {
  email: string;
  password: string;
}

//UPDATE
interface IAuthorUpdateRequest {
  name: string;
  password: string;
  city: string;
  country: string;
}

export {
  ICreateAuthorRequest,
  IOmitAuthorPassword,
  ICreateAuthorResponse,
  ILoginAuthor,
  IAuthorWithBooksResponse,
  IAuthorUpdateRequest,
};

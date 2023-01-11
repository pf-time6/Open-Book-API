import { ICreateBooksRequest } from "../../../interfaces/books.interface";

const mockednBooksRequest: ICreateBooksRequest = {
  title: "This book is very good",
  category: [1, 2, 4],
  about: "A história de um herói guerreiro da idade média que enfrenta o im...",
  coverUrl: "http://mh.app.br/HDCover.png",
};

const mockedInvalidBodyBooks: object = {};

export { mockednBooksRequest, mockedInvalidBodyBooks };

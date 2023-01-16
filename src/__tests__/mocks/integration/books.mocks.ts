import { ICreateBookRequest } from "../../../interfaces";
import { ICreateBookRequestTests } from "../../../interfaces/books.interface";

const mockedBooksRequest: ICreateBookRequestTests = {
  title: "This book is very good",
  category: [1],
  about: "A história de um herói guerreiro da idade média que enfrenta o im...",
  coverUrl: "asdasd",
};

const mockedInvalidBodyBooks: object = {};

const mockedListBooks = [
  {
    title: "This book",
    category: [1],
    about:
      "A história de um herói guerreiro da idade média que enfrenta o im...",
    coverUrl: "asdasd",
  },
];

export { mockedBooksRequest, mockedInvalidBodyBooks, mockedListBooks };

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
  {
    title: "Harry Potter",
    category: [1],
    about: "Harry potter é emo.",
    coverUrl: "asdasd",
  },
  {
    title: "Mal e o bem",
    category: [1],
    about: "amor e odio",
    coverUrl: "asdasd",
  },
];

export { mockedBooksRequest, mockedInvalidBodyBooks, mockedListBooks };

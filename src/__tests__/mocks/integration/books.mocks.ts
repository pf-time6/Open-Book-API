import {
  ICreateBookRequest,
  IUpdateBookRequest,
} from "../../../interfaces/books.interface";

const mockedBooksRequest: ICreateBookRequest = {
  title: "This book is very good",
  category: [1],
  about: "A história de um herói guerreiro da idade média que enfrenta o im...",
  coverUrl: "asdasd",
};

const mockedBooksUpdateRequest: IUpdateBookRequest = {
  category: [2],
  about: "About atualizado com sucesso",
  coverUrl: "coverUrl atualizado com sucesso",
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

export { mockedBooksRequest, mockedInvalidBodyBooks, mockedListBooks, mockedBooksUpdateRequest };

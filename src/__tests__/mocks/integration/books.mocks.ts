import { ICreateBookRequest } from "../../../interfaces";

const mockedBooksRequest: ICreateBookRequest = {
  title: "This book is very good",
  category: [1, 2, 4],
  about: "A história de um herói guerreiro da idade média que enfrenta o im...",
  coverUrl: "http://mh.app.br/HDCover.png",
};

const mockedInvalidBodyBooks: object = {};

const mockedListBooks = [
  {
    title: "This book",
    category: [1, 2, 4],
    about:
      "A história de um herói guerreiro da idade média que enfrenta o im...",
    coverUrl: "http://mh.app.br/HDCover.png",
  },
  {
    title: "Harry Potter",
    category: [1, 4, 5],
    about:
      "A história de um herói guerreiro da idade média que enfrenta o im...",
    coverUrl: "http://mh.app.br/HDCover.png",
  },
  {
    title: "Mal e o bem",
    category: [1, 3, 2],
    about:
      "A história de um herói guerreiro da idade média que enfrenta o im...",
    coverUrl: "http://mh.app.br/HDCover.png",
  },
];

export { mockedBooksRequest, mockedInvalidBodyBooks, mockedListBooks };

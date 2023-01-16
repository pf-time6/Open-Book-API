import { ICreatePageRequest } from "../../../interfaces";

const mockedPagesBooksRequest: ICreatePageRequest = {
  page: 1,
  chapter: 1,
  isChapter: true,
  chapterTitle: "O Tesouro de Samarilla",
  content:
    "Era noite na Taberna Adaga Cega, subúrbio da cidade de Sentry em Saint Blade, a chuva fina cai do lado de fora, do lado de dentro o som das gotas ecoam uniformemente o salão onde se encontra Hammerdown bebendo várias canecas de ale enquanto conversa com o taberneiro.",
};

const mockedInvalidBodyPagesBooks: object = {};

export { mockedPagesBooksRequest, mockedInvalidBodyPagesBooks };

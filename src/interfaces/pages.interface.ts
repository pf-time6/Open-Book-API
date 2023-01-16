interface ICreatePageRequest {
  page: number;
  chapter: number;
  isChapter: boolean;
  chapterTitle: string;
  content: string;
}

interface ICreatePageResponse {
  id: string;
  page: number;
  chapter: number;
  isChapter: boolean;
  chapterTitle: string;
  content: string;
   createdAt: Date;
  books: IBooks;
}

interface IShowPageResponse {
  page: number;
  chapter: number;
  isChapter: boolean;
  chapterTitle: string;
  content: string;
  createdAt: Date;
  books: IBooks;
}

interface IBooks {
  id: string;
  title: string;
  about: string;
  coverUrl: string;
  createdAt: Date;
}

interface IDecodedToken {
  email: string;
  isAdm: boolean;
  iat: number;
  ext: number;
  sub: string;
}

export { ICreatePageRequest, ICreatePageResponse, IShowPageResponse, IDecodedToken };


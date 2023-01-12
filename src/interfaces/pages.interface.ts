interface ICreatePagesBookRequest {
  page: number;
  chapter: number;
  isChapter: boolean;
  chapterTitle: string;
  content: string;
}

interface ICreatePagesBookResponse {
  book: string;
  page: number;
  chapter: number;
  isChapter: boolean;
  chapterTitle: string;
  content: string;
}

interface IDecodedToken {
  email: string;
  isAdm: boolean;
  iat: number;
  ext: number;
  sub: string;
}

export { ICreatePagesBookRequest, ICreatePagesBookResponse, IDecodedToken };

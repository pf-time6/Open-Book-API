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
  }

  interface IDecodedToken {
    email: string;
    isAdm: boolean;
    iat: number;
    ext: number;
    sub: string;
  }
  
  export { ICreatePageRequest, ICreatePageResponse, IDecodedToken };

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
  
  export { ICreatePageRequest, ICreatePageResponse };

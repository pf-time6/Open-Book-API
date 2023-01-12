interface ICreateBookRequest {
  title: string;
  category: Number[];
  about: string;
  coverUrl: string;
}

interface ICreateBookResponse {
  id: string;
  title: string;
  category: number[];
  about: string;
  coverUrl: string;
  createdAt: string;
}

export { ICreateBookRequest, ICreateBookResponse };

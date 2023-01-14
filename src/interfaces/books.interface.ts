interface ICreateBookRequest {
  title: string;
  category: number[];
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

<<<<<<< HEAD
export {
  ICreateBookRequest,
  ICreateBookResponse,
=======
interface IListBooksResponse {
  id: string;
  title: string;
  about: string;
  category: string[];
  coverUrl: string;
  author: IAuthorListResponse;
}

interface IAuthorListResponse {
  id: string;
  email: string;
  name: string;
  city: string;
  country: string;
}

interface iBooksData {
  id: string;
  title: string;
  about: string;
  coverUrl: string;
  createdAt: Date;
  books_categories: IBooks_CategoriesData[];
  author: {
    id: string;
    name: string;
    email: string;
    password: string;
    city: string;
    country: string;
    isAdm: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

interface IBooks_CategoriesData {
  id: number;
  categories: ICategoriesData;
}

interface ICategoriesData {
  id: number;
  name: string;
}

interface IGetBooksResposne {}

export {
  ICreateBookRequest,
  ICreateBookResponse,
  IListBooksResponse,
  IAuthorListResponse,
  iBooksData,
  IBooks_CategoriesData,
  ICategoriesData,
>>>>>>> 7eb8c79d427cb8447be61138f9d6da2f011d39f4
};

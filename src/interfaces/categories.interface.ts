<<<<<<< HEAD
export interface ICategoryRequest {
  name: string;
}
=======
//CREATE
//  REQUEST
interface ICategoryRequest {
  name: string;
}
//  RESPONSE
interface ICategoryResponse extends ICategoryRequest {
  id: number;
}

//DELETE
//  RESPONSE
interface ICategoryDelete {
  message: string;
}

export { ICategoryDelete, ICategoryResponse, ICategoryRequest };
>>>>>>> 7eb8c79d427cb8447be61138f9d6da2f011d39f4

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

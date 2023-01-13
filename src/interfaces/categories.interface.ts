//CREATE
//  REQUEST
export interface ICategoryRequest {
  name: string;
}
//  RESPONSE
export interface ICategoryResponse extends ICategoryRequest {
  id: number;
}

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
  isAdmin?: boolean;
}

interface IOmitUserPassword extends Omit<ICreateUserRequest, "password"> {}

interface ICreateUserResponse extends IOmitUserPassword {
  id: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export { ICreateUserRequest, IOmitUserPassword, ICreateUserResponse };

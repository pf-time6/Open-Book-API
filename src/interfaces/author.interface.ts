interface ICreateAuthorRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
  isAdmin?: boolean;
}

interface IOmitAuthorPassword extends Omit<ICreateAuthorRequest, "password"> {}

interface ICreateAuthorResponse extends IOmitAuthorPassword {
  id: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export { ICreateAuthorRequest, IOmitAuthorPassword, ICreateAuthorResponse };

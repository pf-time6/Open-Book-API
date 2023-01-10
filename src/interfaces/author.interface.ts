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
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

export { ICreateAuthorRequest, IOmitAuthorPassword, ICreateAuthorResponse };

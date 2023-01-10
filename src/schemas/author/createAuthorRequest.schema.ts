import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateAuthorRequest } from "../../interfaces/author.interface";

const createAuthorRequestSchema: SchemaOf<ICreateAuthorRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    isAdm: yup.boolean().notRequired(),
  });

export default createAuthorRequestSchema;

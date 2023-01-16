import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAuthorWithBooksResponse } from "../../interfaces/author.interface";

const authorArrayReturnSchema: SchemaOf<IAuthorWithBooksResponse[]> = yup.array(
  yup.object().shape({
    books: yup.array(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    city: yup.string().required(),
    country: yup.string().required(),
    isActive: yup.boolean().notRequired(),
    isAdm: yup.boolean().notRequired(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().notRequired(),
  })
);

export default authorArrayReturnSchema;

import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAuthorWithBooksResponse,
  ICreateAuthorResponse,
} from "../../interfaces/author.interface";

const authorArrayReturnSchema: SchemaOf<IAuthorWithBooksResponse[]> = yup.array(
  yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    books: yup.array(),
  })
);

export default authorArrayReturnSchema;

// yup.object().shape({
//   title: yup.string().max(100).required(),
//   category: yup.array(yup.number()).required(),
//   about: yup.string().max(120).required(),
//   coverUrl: yup.string().max(350).required(),
// })

import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAuthorWithBooksResponse,
  ICreateAuthorResponse,
} from "../../interfaces/author.interface";

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

// yup.object().shape({
//   title: yup.string().max(100).required(),
//   category: yup.array(yup.number()).required(),
//   about: yup.string().max(120).required(),
//   coverUrl: yup.string().max(350).required(),
// })

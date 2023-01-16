import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateBookResponse } from "../../interfaces/books.interface";

const createBooksResponseSchema: SchemaOf<ICreateBookResponse> = yup
  .object()
  .shape({
    createdAt: yup.string().notRequired(),
    coverUrl: yup.string().notRequired(),
    about: yup.string().notRequired(),
    category: yup.array(yup.number()).notRequired(),
    title: yup.string().notRequired(),
    id: yup.string().notRequired(),
  });

export default createBooksResponseSchema;

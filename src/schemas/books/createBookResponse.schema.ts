import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateBookRequest } from "../../interfaces/books.interface";

const createBooksResponseSchema: SchemaOf<ICreateBookRequest> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    title: yup.string().notRequired(),
    category: yup.array(yup.number()).notRequired(),
    about: yup.string().notRequired(),
    coverUrl: yup.string().notRequired(),
    createdAt: yup.string().notRequired(),
  });

export default createBooksResponseSchema;

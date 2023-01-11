import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateBookRequest } from "../../interfaces/books.interface";

const createBooksRequestSchema: SchemaOf<ICreateBookRequest> = yup
  .object()
  .shape({
    title: yup.string().max(100).required(),
    category: yup.array(yup.number()).required(),
    about: yup.string().max(120).required(),
    coverUrl: yup.string().max(350).required(),
  });

export default createBooksRequestSchema;

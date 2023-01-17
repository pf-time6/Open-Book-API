import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUpdateBookRequest } from "../../interfaces/books.interface";

const updateBookRequestSchema: SchemaOf<IUpdateBookRequest> = yup
  .object()
  .shape({
    category: yup.array(yup.number()).notRequired(),
    about: yup.string().max(120).notRequired(),
    coverUrl: yup.string().max(350).notRequired(),
  });

export default updateBookRequestSchema;

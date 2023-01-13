import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAuthorUpdateRequest } from "../../interfaces/author.interface";

const updateAuthorRequestSchema: SchemaOf<IAuthorUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
    city: yup.string().notRequired(),
    country: yup.string().notRequired(),
  });

export default updateAuthorRequestSchema;

import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateAuthorResponse } from "../../interfaces/author.interface";

const updateAuthorReturnSchema: SchemaOf<ICreateAuthorResponse> = yup
  .object()
  .shape({
    deletedAt: yup.mixed().notRequired(),
    updatedAt: yup.date().notRequired(),
    createdAt: yup.date().notRequired(),
    isActive: yup.boolean().notRequired(),
    isAdm: yup.boolean().notRequired(),
    country: yup.string().required(),
    city: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().notRequired(),
  });

export default updateAuthorReturnSchema;

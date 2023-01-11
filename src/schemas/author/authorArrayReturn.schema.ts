import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateAuthorResponse } from "../../interfaces/author.interface";

const authorArrayReturnSchema: SchemaOf<ICreateAuthorResponse[]> = yup.array(
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
  })
);

export default authorArrayReturnSchema;

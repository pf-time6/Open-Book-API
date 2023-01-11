import * as yup from "yup";
import { SchemaOf } from "yup";
import { ILoginAuthor } from "../../interfaces/author.interface";

const loginAuthorSchema: SchemaOf<ILoginAuthor> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default loginAuthorSchema;

import * as yup from "yup";

const showBookResponseSchema = yup.object().shape({
  pages: yup.array(),
  author: yup
    .object({
      country: yup.string().notRequired(),
      city: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
      id: yup.string().notRequired(),
    })
    .notRequired(),
  coverUrl: yup.string().notRequired(),
  category: yup.array(yup.number()).notRequired(),
  about: yup.string().notRequired(),
  title: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export default showBookResponseSchema;

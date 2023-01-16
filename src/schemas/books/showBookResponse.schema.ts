import * as yup from "yup";

const showBookResponseSchema = yup.object().shape({
  author: yup
    .object({
      country: yup.string().notRequired(),
      city: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
      id: yup.string().notRequired(),
    })
    .notRequired(),
  createdAt: yup.date().required(),
  coverUrl: yup.string().notRequired(),
  category: yup
    .array(
      yup.object({
        name: yup.string().required(),
        id: yup.string(),
      })
    )
    .notRequired(),
  about: yup.string().notRequired(),
  title: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export default showBookResponseSchema;

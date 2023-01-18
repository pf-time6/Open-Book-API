import * as yup from "yup";

const createPageResponseSchema = yup.object().shape({
  books: yup
    .object({
      id: yup.string().required(),
      title: yup.string().required(),
      about: yup.string().required(),
      coverUrl: yup.string().required(),
      createdAt: yup.date().required(),
    })
    .required(),
  createdAt: yup.date().required(),
  content: yup.string().max(1800).required(),
  chapterTitle: yup.string().required(),
  isChapter: yup.boolean().required(),
  chapter: yup.number().required(),
  page: yup.number().required(),
  id: yup.string().required(),
});

export default createPageResponseSchema;

import * as yup from "yup";

const editBookPageResponseSchema = yup.object().shape({
  id: yup.string().required(),
  page: yup.number().required(),
  chapter: yup.number().required(),
  isChapter: yup.boolean().required(),
  chapterTitle: yup.string().required(),
  content: yup.string().required(),
});

export default editBookPageResponseSchema;

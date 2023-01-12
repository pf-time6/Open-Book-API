import * as yup from "yup";

const createPageRequestSchema = yup.object().shape({
    page: yup.number().required(),
    chapter: yup.number().required(),
    isChapter: yup.boolean().required(),
    chapterTitle: yup.string().required(),
    content: yup.string().max(1800).required(),
  });

export default createPageRequestSchema;

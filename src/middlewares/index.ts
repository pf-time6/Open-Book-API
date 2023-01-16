import validateSchemaMiddleware from "./validateSchema.middleware";
import ensureAuthMiddleware from "./ensureAuth.middleware";
import isAdmOrOwnAuthorMiddleware from "./isAdmOrOwnAuthor.middleware";
import isValidIdMiddleware from "./isValidId.middleware";
import ensureAlreadyExistChapter from "./ensureAlreadyExistChapter.middleware";
import ensureBookExists from "./ensureBookExists.middleware";
import ensurePageExists from "./ensurePageExists.middleware";
import ensureEmailExistsMiddleware from "./ensureEmailExists.middleware";
import isAdmOrBookAuthorMiddleware from "./isAdmOrBookAuthor.middleware";
import fieldsNotPermitedUpdateMiddleware from "./fieldsNotPermitedUpdate.middleware";

export {
  validateSchemaMiddleware,
  ensureAuthMiddleware,
  ensureAlreadyExistChapter,
  ensureBookExists,
  ensurePageExists,
  ensureEmailExistsMiddleware,
  isAdmOrOwnAuthorMiddleware,
  isAdmOrBookAuthorMiddleware,
  isValidIdMiddleware,
  fieldsNotPermitedUpdateMiddleware,
};

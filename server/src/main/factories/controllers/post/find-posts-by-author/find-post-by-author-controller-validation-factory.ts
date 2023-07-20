import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";

export const makeFindPostsByAuthorValidation = (): ValidationComposite => {
  return new ValidationComposite([new RequiredFieldValidation("authorId")]);
};

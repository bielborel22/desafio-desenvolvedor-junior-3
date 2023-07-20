import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";

export const makeCreatePostValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation("title"),
    new RequiredFieldValidation("content"),
  ]);
};

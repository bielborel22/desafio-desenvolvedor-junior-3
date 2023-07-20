import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";

export const makeUpdatePostControllerValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation("title"),
    new RequiredFieldValidation("content"),
  ]);
};

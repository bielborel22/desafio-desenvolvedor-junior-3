import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";

export const makeFindPostByIdValidation = (): ValidationComposite => {
  return new ValidationComposite([new RequiredFieldValidation("postId")]);
};

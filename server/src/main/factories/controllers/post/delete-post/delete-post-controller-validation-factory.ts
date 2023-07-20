import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";

export const makeDeletePostValidation = (): ValidationComposite => {
  return new ValidationComposite([new RequiredFieldValidation("postId")]);
};

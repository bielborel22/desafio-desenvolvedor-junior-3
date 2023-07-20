import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { makeCreatePostValidation } from "./create-post-controller-validation-factory";

jest.mock("../../../../../validation/validators/validation-composite");

describe("CreatePostController Validation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeCreatePostValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("title"),
      new RequiredFieldValidation("content"),
    ]);
  });
});

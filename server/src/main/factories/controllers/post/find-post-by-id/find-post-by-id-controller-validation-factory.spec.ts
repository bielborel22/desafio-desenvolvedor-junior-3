import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { makeFindPostByIdValidation } from "./find-post-by-id-controller-validation-factory";

jest.mock("../../../../../validation/validators/validation-composite");

describe("CreatePostController Validation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeFindPostByIdValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("postId"),
    ]);
  });
});

import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { makeDeletePostValidation } from "./delete-post-controller-validation-factory";

jest.mock("../../../../../validation/validators/validation-composite");

describe("DeletePostController Validation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeDeletePostValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("postId"),
    ]);
  });
});

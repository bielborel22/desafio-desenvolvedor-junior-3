import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { makeUpdatePostControllerValidation } from "./update-post-controller-validation-factory";

jest.mock("../../../../../validation/validators/validation-composite");

describe("UpdatePostController Validation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeUpdatePostControllerValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("title"),
      new RequiredFieldValidation("content"),
    ]);
  });
});

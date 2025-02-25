import { MissingParameterError } from "../../presentations/errors";
import { Validation } from "../../presentations/protocols";
import { ValidationComposite } from "./validation-composite";

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

type SutType = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

const makeSut = (): SutType => {
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe("Validation Composite", () => {
  test("should return an error if any validation fails", async () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[0], "validate")
      .mockReturnValueOnce(new MissingParameterError("email"));
    const error = sut.validate({
      email: "any_email@mail.com",
    });
    expect(error).toEqual(new MissingParameterError("email"));
  });

  test("should return the first error if more than one validation fails", async () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParameterError("email"));
    const error = sut.validate({
      email: "any_email@mail.com",
    });
    expect(error).toEqual(new Error());
  });

  test("should return nothing if validation succeeds", async () => {
    const { sut } = makeSut();
    const error = sut.validate({
      email: "any_email@mail.com",
    });
    expect(error).toBeNull();
  });
});

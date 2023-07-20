import { EmailValidatorAdapter } from "./email-validator-adapter";

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("EmailValidatorAdapter", () => {
  test("should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(sut, "validate").mockReturnValueOnce(false);
    const isValid = sut.validate("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.validate("valid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("should call validator with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(sut, "validate");
    sut.validate("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});

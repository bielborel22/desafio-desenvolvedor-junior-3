import { EmailValidator } from "../validation/protocols/email-validator";

export class EmailValidatorAdapter implements EmailValidator {
  validate(email: string): boolean {
    const VALIDATE_EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return VALIDATE_EMAIL_REGEX.test(email);
  }
}

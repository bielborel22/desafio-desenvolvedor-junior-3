import { MissingParameterError } from "../../presentations/errors";
import { Validation } from "../../presentations/protocols";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error | null {
    if (!data[this.fieldName]) {
      return new MissingParameterError(this.fieldName);
    }
    return null;
  }
}

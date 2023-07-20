export class InvalidParameterError extends Error {
  constructor(paramName: string) {
    super(`Invalid parameter: ${paramName}`);
    this.name = "InvalidParameterError";
  }
}

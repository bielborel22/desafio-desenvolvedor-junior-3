import {
  Authentication,
  Validation,
  badRequest,
  ok,
  serverError,
  unauthorized,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../sign-in/sign-in-controller-protocols";

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);
      if (error) return badRequest(error);

      const { email, password } = request.body;
      const user = await this.authentication.auth({ email, password });
      if (!user) return unauthorized();

      return ok({ user });
    } catch (e) {
      return serverError(e as Error);
    }
  }
}

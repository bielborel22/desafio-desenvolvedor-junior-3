import {
  Authentication,
  Controller,
  CreateUser,
  HttpRequest,
  HttpResponse,
  ParameterAlreadyInUseError,
  Validation,
  badRequest,
  created,
  forbidden,
  serverError,
} from "./sign-up-controller-protocols";

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createUser: CreateUser,
    private readonly authentication: Authentication
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);
      if (error) return badRequest(error);

      const { email, password } = request.body;
      const createdUser = await this.createUser.create({ email, password });
      if (!createdUser)
        return forbidden(new ParameterAlreadyInUseError("email"));

      const user = await this.authentication.auth({ email, password });

      return created({ user });
    } catch (e) {
      return serverError(e as Error);
    }
  }
}

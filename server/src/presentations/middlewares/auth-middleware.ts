import { FindUserByAccessToken } from "../../domain/use-cases/user/find-user-by-access-token";
import { AccessDeniedError } from "../errors";
import { forbidden, ok, serverError } from "../helpers/http/http-helper";
import { HttpRequest, HttpResponse } from "../protocols";

export class AuthMiddleware implements AuthMiddleware {
  constructor(private readonly findUserByAccessToken: FindUserByAccessToken) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = request.headers?.["authorization"];
      if (!accessToken) return forbidden(new AccessDeniedError());

      const account = await this.findUserByAccessToken.findByAccessToken(
        accessToken
      );
      console.log(account);
      if (!account) return forbidden(new AccessDeniedError());

      return ok({ userId: account.id });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

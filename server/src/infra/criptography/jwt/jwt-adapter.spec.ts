import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";
import { environment } from "../../../main/config/env";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "any_token";
  },
  async verify(): Promise<string> {
    return "any_value";
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(environment.jwtSecret);
};

describe("JWT Adapter", () => {
  test("should call sign with correct values", async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");
    expect(signSpy).toHaveBeenCalledWith(
      {
        id: "any_id",
      },
      "secret_key"
    );
  });

  test("should return a token on sign success", async () => {
    const sut = makeSut();
    const accessToken = await sut.encrypt("any_id");
    expect(accessToken).toBe("any_token");
  });

  test("should throw if sign throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(jwt, "sign")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.encrypt("any_id");
    await expect(promise).rejects.toThrow();
  });
});

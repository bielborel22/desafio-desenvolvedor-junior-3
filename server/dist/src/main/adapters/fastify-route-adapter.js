"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            body: request.body,
            params: request.params,
            userId: request.userId,
        };
        const httpResponse = yield controller.handle(httpRequest);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            return reply.status(httpResponse.statusCode).send(httpResponse.body);
        }
        return reply
            .status(httpResponse.statusCode)
            .send({ error: httpResponse.body.message });
    });
};
exports.adaptRoute = adaptRoute;

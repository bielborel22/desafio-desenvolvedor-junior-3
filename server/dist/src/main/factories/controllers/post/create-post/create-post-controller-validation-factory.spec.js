"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../../validation/validators");
const create_post_controller_validation_factory_1 = require("./create-post-controller-validation-factory");
jest.mock("../../../../../validation/validators/validation-composite");
describe("CreatePostController Validation Factory", () => {
    test("should call ValidationComposite with all validations", () => {
        (0, create_post_controller_validation_factory_1.makeCreatePostValidation)();
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith([
            new validators_1.RequiredFieldValidation("title"),
            new validators_1.RequiredFieldValidation("content"),
        ]);
    });
});

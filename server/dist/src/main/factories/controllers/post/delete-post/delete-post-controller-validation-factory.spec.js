"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../../validation/validators");
const delete_post_controller_validation_factory_1 = require("./delete-post-controller-validation-factory");
jest.mock("../../../../../validation/validators/validation-composite");
describe("DeletePostController Validation Factory", () => {
    test("should call ValidationComposite with all validations", () => {
        (0, delete_post_controller_validation_factory_1.makeDeletePostValidation)();
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith([
            new validators_1.RequiredFieldValidation("postId"),
        ]);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../../validation/validators");
const update_post_controller_validation_factory_1 = require("./update-post-controller-validation-factory");
jest.mock("../../../../../validation/validators/validation-composite");
describe("UpdatePostController Validation Factory", () => {
    test("should call ValidationComposite with all validations", () => {
        (0, update_post_controller_validation_factory_1.makeUpdatePostControllerValidation)();
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith([
            new validators_1.RequiredFieldValidation("title"),
            new validators_1.RequiredFieldValidation("content"),
        ]);
    });
});

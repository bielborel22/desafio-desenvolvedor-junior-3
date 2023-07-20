"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../../validation/validators");
const find_post_by_id_controller_validation_factory_1 = require("./find-post-by-id-controller-validation-factory");
jest.mock("../../../../../validation/validators/validation-composite");
describe("CreatePostController Validation Factory", () => {
    test("should call ValidationComposite with all validations", () => {
        (0, find_post_by_id_controller_validation_factory_1.makeFindPostByIdValidation)();
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith([
            new validators_1.RequiredFieldValidation("postId"),
        ]);
    });
});

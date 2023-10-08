import type { ObjectPropertyValidatorData } from "./ObjectValidation.types";
import { ObjectPropertyValidator } from "./ObjectPropertyValidator.js";

export const ObjectPropertyValidatorManager = {
  _validators: new Map<string, ObjectPropertyValidator>(),

  registerValidators(validators: ObjectPropertyValidatorData[]) {
    validators.forEach((data) =>
      this._validators.set(data.id, new ObjectPropertyValidator(data))
    );
  },
  getValidator(id: string) {
    const validator = this._validators.get(id);
    if (!validator) throw new Error(`Validator with ${id} does not exist`);
    return validator;
  },
};

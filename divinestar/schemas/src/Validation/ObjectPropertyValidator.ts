import type { ObjectCollectionData } from "ObjectCollection.types";
import type {
  ObjectPropertyValidatorData,
  ObjectPropertyValidatorResponse,
} from "./ObjectValidation.types";

export class ObjectPropertyValidator {
  constructor(public data: ObjectPropertyValidatorData) {}

  validate(value : unknown, data: ObjectCollectionData): ObjectPropertyValidatorResponse {
    return this.data.validate(value,data);
  }
}

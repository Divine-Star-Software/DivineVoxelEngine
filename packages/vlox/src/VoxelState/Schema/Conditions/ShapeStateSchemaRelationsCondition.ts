import { StateSchema } from "../StateSchema";

export abstract class ShapeStateSchemaRelationsCondition {

    constructor(public schema: StateSchema) {}

  abstract evulate(): boolean;
}

import { ConsistentRotationTextureProcedure } from "./Default/ConsistentRotationTextureProcedure";
import { OutlinedTextureProcedure } from "./Default/OutlinedTextureProcedure";
import { TextureProcedure } from "./TextureProcedure";

export class TextureProcedureRegister {
  static procedures = new Map<string, TextureProcedure>();

  static register(id: string, procedure: TextureProcedure) {
    this.procedures.set(id, procedure);
  }
  static get(id: string) {
    const procedure = this.procedures.get(id);
    if (!procedure) throw new Error(`Procedure with id ${id} does not exist`);
    return procedure;
  }
}

TextureProcedureRegister.register(
  "consistent-rotation",
  new ConsistentRotationTextureProcedure()
);
TextureProcedureRegister.register(
  "outlined",
  new OutlinedTextureProcedure()
);

import {
  FlowEditorNodeComponentData,
  FlowEditorNodeComponentTypeData,
} from "./FlowEditorNode.types";

export class FlowEditorNodeComponentRegister {
  static types = new Map<string, FlowEditorNodeComponentTypeData<any>>();
  static getType(typeId: string) {
    const type = this.types.get(typeId);
    if (!type) throw new Error(`${type} with id does not exist`);
    return type;
  }
  static registerType<Data extends any = {}>(
    typeData: FlowEditorNodeComponentTypeData<Data>
  ) {
    this.types.set(typeData.type, typeData);
    return function create(
      data: Data
    ): FlowEditorNodeComponentData<Data> {
      return {
        type: typeData.type,
        data,
      };
    };
  }
}

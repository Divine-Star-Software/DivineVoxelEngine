import {
  FlowEditorPanelComponentData,
  FlowEditorPanelComponentTypeData,
} from "./FlowEditorPanel.types";

export class FlowEditorPanelComponentRegister {
  static types = new Map<string, FlowEditorPanelComponentTypeData<any>>();
  static getType(typeId: string) {
    const type = this.types.get(typeId);
    if (!type) throw new Error(`${type} with id does not exist`);
    return type;
  }
  static registerType<Data extends any = {}>(
    typeData: FlowEditorPanelComponentTypeData<Data>
  ) {
    this.types.set(typeData.type, typeData);
    return function create(
      label: string,
      data: Data
    ): FlowEditorPanelComponentData<Data> {
      return {
        label,
        type: typeData.type,
        data,
      };
    };
  }
}

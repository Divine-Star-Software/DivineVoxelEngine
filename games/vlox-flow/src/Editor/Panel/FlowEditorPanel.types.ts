export interface FlowEditorPanelData {
  name: string;
  collapsed: boolean;
  items: FlowEditorPanelComponentData<any>[];
}

export interface FlowEditorPanelComponentData<Data extends any> {
  label: string;
  type: string;
  data: Data;
}

export interface FlowEditorPanelComponentTypeData<Data extends any> {
  type: string;
  css?: string;
  render(container: HTMLDivElement, label: string, data: Data): void;
}

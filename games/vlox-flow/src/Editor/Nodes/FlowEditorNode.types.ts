
export interface FlowEditorNodeComponentData<Data extends any> {
  type: string;
  data: Data;
}

export interface FlowEditorNodeComponentTypeData<Data extends any> {
  type: string;
  css?: string;
  render(container: HTMLElement,  data: Data): void;
}

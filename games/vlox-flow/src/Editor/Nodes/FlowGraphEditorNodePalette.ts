import { FlowGraphElement } from "@amodx-elms/flow";

export interface FlowGraphEditorNodePaletteData {
  name: string;
  category: string;
  addNode(x: number, y: number, graphEditor: FlowGraphElement): void;
}

export class FlowGraphEditorNodePalette {
  categories = new Map<string, FlowGraphEditorNodePaletteData[]>();

  register(...data: FlowGraphEditorNodePaletteData[]) {
    for (const item of data) {
      const list = this.categories.get(item.category);
      if (list) {
        list.push(item);
      } else {
        this.categories.set(item.category, [item]);
      }
    }
  }

  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  getNodesInCategory(category: string): FlowGraphEditorNodePaletteData[] {
    return this.categories.get(category) ?? [];
  }
}

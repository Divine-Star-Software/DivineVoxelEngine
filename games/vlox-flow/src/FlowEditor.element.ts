import {
  FlowGraphElement,
  FlowNodeElement,
  FlowNodeRegister,
} from "@amodx-elms/flow";
import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { FlowGraphEditorNodePalette } from "./Editor/Nodes/FlowGraphEditorNodePalette";
import { FlowEditorPanelData } from "./Editor/Panel/FlowEditorPanel.types";
import { FlowEditorPanelComponentRegister } from "./Editor/Panel/FlowEditorPanelComponentRegister";
import { TextLine } from "./Editor/Panel/Components/TextLine";
import { TextInput } from "./Editor/Panel/Components/TextInput";
import { FlowEditorNodeComponentRegister } from "./Editor/Nodes/FlowEditorNodeComponentRegister";
import { Button } from "./Editor/Panel/Components/Button";
import { JSONFileAPI } from "../Util/JSONFileAPI";
export class GraphEditorEvent<T = any> extends Event {
  constructor(type: string, public data: T) {
    super(type, { bubbles: false, composed: false });
  }
}

interface FlowGraphEditorEventMap {
  "graph-compiled": GraphEditorEvent<FlowGraphElement>;
}

export class FlowEditorElement extends HTMLElement {
  flowGraph: FlowGraph;
  flowGraphEditor: FlowGraphElement;
  flowNodeRegsiter: FlowNodeRegister;
  flowNodePalette: FlowGraphEditorNodePalette;
  visualizerContainer: HTMLDivElement;

  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this.visualizerContainer = this.ownerDocument.createElement("div");
    this.visualizerContainer.classList.add("visualizer-container");
  }
  private _accordion(title: string, show = true) {
    const accordion = this.ownerDocument.createElement("div");
    accordion.className = "accordion";

    //header
    const accordionHeader = this.ownerDocument.createElement("div");
    accordionHeader.className = "accordion-header";
    const headerText = this.ownerDocument.createElement("p");
    headerText.innerText = title;
    accordionHeader.append(headerText);

    const collapseIcon = document.createElement("div");
    accordionHeader.append(collapseIcon);

    //body
    const accordionBody = this.ownerDocument.createElement("div");
    accordionBody.className = "accordion-body";
    if (!show) accordionBody.style.display = "none";

    accordionHeader.addEventListener("pointerdown", () => {
      if (accordionBody.style.display == "none") {
        return (accordionBody.style.display = "block");
      }
      accordionBody.style.display = "none";
    });

    accordion.append(accordionHeader, accordionBody);
    return { accordion, accordionHeader, accordionBody };
  }

  private _nodePanel() {
    const panel = this.ownerDocument.createElement("div");
    panel.className = "node-panel";
    //filter
    const nodeFilter = this.ownerDocument.createElement("div");
    nodeFilter.className = "node-filter";
    const filterInput = this.ownerDocument.createElement("input");
    filterInput.className = "node-filter-input";
    filterInput.type = "string";
    filterInput.placeholder = "Filter";
    nodeFilter.append(filterInput);
    panel.append(nodeFilter);

    //nodes
    const nodeContainer = this.ownerDocument.createElement("div");
    nodeContainer.className = "node-panel-list";
    for (const category of this.flowNodePalette.getCategories()) {
      const { accordion, accordionBody } = this._accordion(category);
      nodeContainer.append(accordion);
      const nodes = this.flowNodePalette.getNodesInCategory(category);
      for (const node of nodes) {
        const div = this.ownerDocument.createElement("div");
        div.draggable = true;
        div.className = "node-panel-node";
        const text = this.ownerDocument.createElement("p");
        text.innerText = node.name;
        div.append(text);
        div.addEventListener("pointerdown", () => {
          const dragEnd = (event: MouseEvent) => {
            event.preventDefault();
            this.flowGraphEditor.removeEventListener("dragover", dragOver);
            this.flowGraphEditor.removeEventListener("drop", dropped);
          };
          const dragOver = (event: MouseEvent) => {
            event.preventDefault();
          };
          const dropped = (event: MouseEvent) => {
            event.preventDefault();
            const { x, y } =
              this.flowGraphEditor._getMousePositionInGraph(event);
            node.addNode(x, y, this.flowGraphEditor);
          };
          div.addEventListener("dragend", dragEnd);
          this.flowGraphEditor.addEventListener("dragover", dragOver);
          this.flowGraphEditor.addEventListener("drop", dropped);
        });
        accordionBody.append(div);
      }
    }
    panel.append(nodeContainer);
    return panel;
  }

  private _propertyPanel() {
    const container = this.ownerDocument.createElement("div");
    container.className = "property-panel";
    const contentConteinr = this.ownerDocument.createElement("div");
    contentConteinr.classList.add("property-panel-content");
    container.append(contentConteinr, this.visualizerContainer);
    const graphPanel = this._graphPropertyPanel();
    contentConteinr.append(graphPanel);
    this.flowGraphEditor.addEventListener("node-clicked", (event) => {
      contentConteinr.innerHTML = "";
      contentConteinr.append(this._nodePropertyPanel(event.data));
    });
    this.flowGraphEditor.addEventListener("graph-clicked", () => {
      contentConteinr.innerHTML = "";
      contentConteinr.append(this._graphPropertyPanel());
    });
    this.flowGraphEditor.addEventListener("connection-clicked", () => {
      contentConteinr.innerHTML = "";
      contentConteinr.append(this._graphPropertyPanel());
    });
    return container;
  }

  private _renderPanel(panel: FlowEditorPanelData) {
    const { accordion, accordionBody } = this._accordion(panel.name, true);
    for (const item of panel.items) {
      const type = FlowEditorPanelComponentRegister.getType(item.type);
      const conatiner = this.ownerDocument.createElement("div");
      type.render(conatiner, item.label, item.data);
      accordionBody.append(conatiner);
    }
    return accordion;
  }

  private _graphPropertyPanel() {
    const container = this.ownerDocument.createElement("div");
    const panels: FlowEditorPanelData[] = [
      {
        name: "General",
        items: [
          TextInput("Name", {
            text: "name",
            onInput(value) {},
          }),
          TextInput("Comments", {
            text: "",
            onInput(value) {},
          }),
        ],
        collapsed: false,
      },
      {
        name: "File",
        items: [
          Button("Load", {
            onClick: async () => {
              const json = await JSONFileAPI.uploadJSON();
              this.flowGraphEditor.importGraph(json);
            },
          }),
          Button("Save", {
            onClick: async () => {
              const json = this.flowGraph.toJSON();
              await JSONFileAPI.downloadJSON("graph.json", json);
            },
          }),
          Button("Compile", {
            onClick: async () => {
        /*       const json = this.flowGraph.toJSON();
              const test = new FunctionCompiler(json);
              for (const dep of test.dependencies) {
                if ((dep.node.type = "PerlinNoise3D")) {
                  dep.set((x: number, y: number, z: number) => 0);
                }
              } */
            
              this.dispatchEvent(new GraphEditorEvent("graph-compiled", this));

            //  console.warn("BUILT FUNCTION: ", test, json);
           //   console.warn("RUN FUNCTION: ", test.run());
            },
          }),
        ],
        collapsed: false,
      },
    ];
    for (const panel of panels) {
      container.append(this._renderPanel(panel));
    }
    return container;
  }

  private _nodePropertyPanel(nodeElement: FlowNodeElement) {
    const container = this.ownerDocument.createElement("div");
    const node = nodeElement.flowNode;
    const panels: FlowEditorPanelData[] = [
      {
        name: "General",
        items: [
          TextInput("Name", {
            text: node.name,
            onInput(value) {
              nodeElement.updateNodeName(value);
            },
          }),
          TextLine("Type", { text: node.type }),
          TextInput("Comments", {
            text: "",
            onInput(value) {},
          }),
        ],
        collapsed: false,
      },
    ];
    const nodeTypeData = this.flowNodeRegsiter.getNode(node.type);
    if (nodeTypeData?.renderPanel) {
      panels.push(...nodeTypeData.renderPanel(nodeElement));
    }
    for (const panel of panels) {
      container.append(this._renderPanel(panel));
    }
    return container;
  }

  connectedCallback() {
    if (!this.flowGraph) {
      throw new Error("<flow-editor> was connected without a graph property.");
    }

    let panelComponentCSS = "";
    for (const [type, comp] of FlowEditorPanelComponentRegister.types) {
      if (comp.css) {
        panelComponentCSS += comp.css;
      }
    }

    let nodeComponentCSS = "";
    for (const [type, comp] of FlowEditorNodeComponentRegister.types) {
      if (comp.css) {
        nodeComponentCSS += comp.css;
      }
    }

    this._shadow.innerHTML = /* html */ `
<style>
  :host {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    z-index: 100000;
    --primary: #6392ad;

    * {
      margin: 0;
      padding: 0;
    }
  }

  .node-panel {
    width: 200px;
    height: 100%;
    background-color: #333333;
    border-right: 4px solid #1e1e1e;
    z-index: 1;

    .node-filter {
      overflow: hidden;
      height: 30px;
    }

    .node-filter-input {
      overflow: hidden;
      background-color: #333333;
      color: white;
      outline: none;
      border: none;
      border-bottom: 1px solid var(--primary);
    }

    .node-panel-list {
      overflow-y: scroll;
      overflow-x: hidden;
      height: calc(100% - 30px);
    }

    .node-panel-node {
      border-bottom: 1px solid white;
      text-align: center;
      width: 100%;
      padding-top: 5px;
      padding-bottom: 5px;

      &:hover {
        background-color: #6392ad;
        cursor: grab;
      }
    }
  }

  flow-graph {
    width: 100%;
    height: 100%;
  }

  .property-panel {
    width: 500px;
    height: 100%;
    color: white;
    background-color: #333333;
    border-left: 4px solid #1e1e1e;
    z-index: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .property-panel-content {
      height: calc(100%-300px);
      overflow-y: scroll;
      overflow-x: hidden;
      ${panelComponentCSS}
    }
    .visualizer-container {
      height: 300px;
      background-color: #5c5c5c;
    }

  }


  .accordion {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 4px solid #1e1e1e;
    .accordion-header {
      background-color: #5c5c5c;
      display: flex;
      flex-direction: row;
      align-items: center;
      user-select: none;
      color: white;
      padding: 5px;


      &:hover {
        cursor: pointer;
      }
    }

    .accordion-body {
      background-color: #1e1e1e;
      color: white;
      display: flex;
      flex-direction: column;
    }
  }
</style>
`;

    this.flowGraphEditor = document.createElement("flow-graph");
    this.flowGraphEditor.flowNodeBodyCSS = nodeComponentCSS;
    this.flowGraphEditor.flowGraph = this.flowGraph;
    this.flowGraphEditor.flowNodeRegister = this.flowNodeRegsiter;
    this._shadow.append(
      this._nodePanel(),
      this.flowGraphEditor,
      this._propertyPanel()
    );
  }

  addEventListener<K extends keyof FlowGraphEditorEventMap>(
    type: K,
    listener: (this: FlowGraphElement, ev: FlowGraphEditorEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: FlowGraphElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    super.addEventListener(type, listener, options);
  }

  removeEventListener<K extends keyof FlowGraphEditorEventMap>(
    type: K,
    listener: (this: FlowGraphElement, ev: FlowGraphEditorEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;

  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: FlowGraphElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    super.removeEventListener(type, listener, options);
  }
}

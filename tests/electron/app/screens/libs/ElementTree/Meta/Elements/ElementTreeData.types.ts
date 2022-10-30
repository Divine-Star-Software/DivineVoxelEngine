import { Component } from "Meta/Components/Component.type";
import { ElementAttributes } from "./ElementAttributes.types";

export type ElementTypes =
  | "component"
  | "rawHTML"
  | "fragment"
  | "div"
  | "span"
  | "pre"
  | "code"
  | "embed"
  | "object"
  | "param"
  | "picture"
  | "source"
  | "audio"
  | "video"
  | "track"
  | "img"
  | "svg"
  | "ul"
  | "ol"
  | "li"
  | "nav"
  | "article"
  | "aside"
  | "section"
  | "header"
  | "footer"
  | "form"
  | "input"
  | "label"
  | "textarea"
  | "select"
  | "option"
  | "optiongroup"
  | "datalist"
  | "button"
  | "hr"
  | "a"
  | "canvas"
  | "iframe"
  | "table"
  | "th"
  | "thead"
  | "tbody"
  | "colgroup"
  | "tr"
  | "td"
  | "text"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type ElementEvents =
  | "onInput"
  | "onReset"
  | "onSearch"
  | "onChange"
  | "onClick"
  | "onDoubleClick"
  | "onContextMenu"
  | "onKeyDown"
  | "onKeyUp"
  | "onKeyPress"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchStart"
  | "onWheel"
  | "onMouseUp"
  | "onMouseDown"
  | "onMouseOver"
  | "onMouseOver"
  | "onMouseEnter"
  | "onMouseMove"
  | "onMouseLeave"
  | "onFocus"
  | "onFocusIn"
  | "onFocusOut"
  | "onBlur"
  | "onSelect"
  | "onCopy"
  | "onCut"
  | "onPaste"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "onDrop";

export type InputValueTypes = "string" | "number" | "boolean";

export type InputBindData = {
  bindTo: any;
  objectPropertyName: string;
  valueType: InputValueTypes;
};

export type ElementTreeObject = {
  type: ElementTypes;
  component?: {
    func: Component<any>;
    stateProps: any;
    stateObject: Readonly<any>;
    element:  Exclude<ElementTypes, "component" | "fragment">;
  };
  cascade?: {
    origin: any;
    receiver: (elm: any, cascadeProps: any) => void;
  };
  bindInput?: InputBindData;
  toRef?: {
    refObj: any;
    refObjProperty: string;
  };
  attrs?: ElementAttributes;
  events?: { [K in ElementEvents]?: Function };
  text?: string;
  rawHTML?: string;
  children?: ElementTreeData;
};

type Elements = ElementTreeObject | ElementTreeObject[] | ElementTreeData;
export type ElementTreeData = Elements[];

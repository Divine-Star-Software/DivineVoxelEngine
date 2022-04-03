import { ElementTreeObject, ElementEvents } from "Meta/Elements/ElementTreeData.types";

export const elementEventFunctions: Record<ElementEvents, Function> = {
 onInput: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("input", (elmObj as any).events.onInput);
 },
 onReset: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("reset", (elmObj as any).events.onReset);
 },
 onSearch: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("search", (elmObj as any).events.onSearch);
 },
 onChange: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("change", (elmObj as any).events.onChange);
 },
 onClick: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("click", (elmObj as any).events.onClick);
 },
 onDoubleClick: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("dbclick", (elmObj as any).events.onDoubleClick);
 },
 onContextMenu: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("contextmenu", (elmObj as any).events.onContextMenu);
 },
 onKeyDown: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("keydown", (elmObj as any).events.onKeyDown);
 },
 onKeyUp: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("keyup", (elmObj as any).events.onKeyUp);
 },
 onKeyPress: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("keypress", (elmObj as any).events.onKeyPress);
 },
 onTouchStart: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("touchstart", (elmObj as any).events.onTouchStart);
 },
 onTouchEnd: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("touchend", (elmObj as any).events.onTouchEnd);
 },
 onTouchMove: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("touchmove", (elmObj as any).events.onTouchMove);
 },
 onWheel: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("wheel", (elmObj as any).events.onWheel);
 },
 onMouseUp: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mouseup", (elmObj as any).events.onMouseUp);
 },
 onMouseDown: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mousedown", (elmObj as any).events.onMouseDown);
 },
 onMouseOver: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mouseover", (elmObj as any).events.onMouseOver);
 },
 onMouseEnter: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mouseenter", (elmObj as any).events.onMouseEnter);
 },
 onMouseMove: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mousemove", (elmObj as any).events.onMouseMove);
 },
 onMouseLeave: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("mouseleave", (elmObj as any).events.onMouseLeave);
 },
 onFocus: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("focus", (elmObj as any).events.onFocus);
 },
 onFocusIn: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("focusin", (elmObj as any).events.onFocusIn);
 },
 onFocusOut: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("focusout", (elmObj as any).events.onFocusOut);
 },
 onBlur: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("blur", (elmObj as any).events.onBlur);
 },
 onSelect: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("select", (elmObj as any).events.onSelect);
 },
 onCopy: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("copy", (elmObj as any).events.onCopy);
 },
 onCut: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("cut", (elmObj as any).events.onCut);
 },
 onPaste: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("paste", (elmObj as any).events.onPaste);
 },
 onDrag: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("drag", (elmObj as any).events.onDrag);
 },
 onDragEnd: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("dragend", (elmObj as any).events.onDragEnd);
 },
 onDragStart: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("dragstart", (elmObj as any).events.onDragStart);
 },
 onDrop: (elm: HTMLElement, elmObj: ElementTreeObject) => {
  elm.addEventListener("drop", (elmObj as any).events.onDrop);
 },
};

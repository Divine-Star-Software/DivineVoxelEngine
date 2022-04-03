import {
 ElementAttributeList,
 ElementAttributes,
} from "Meta/Elements/ElementAttributes.types";

export const attributeSetFunction: Record<ElementAttributeList, Function> = {
 id: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.id) return;
  elm.id = data.id;
 },
 className: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.className) return;
  elm.className = data.className;
 },
 cssText: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.cssText) return;
  elm.style.cssText = data.cssText;
 },
 accesskey: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.accesskey) return;
  elm.accessKey = data.accesskey;
 },
 contenteditable: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.contenteditable) return;
  elm.contentEditable = String(data.contenteditable);
 },
 dir: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.dir) return;
  elm.dir = String(data.dir);
 },
 draggable: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.draggable) return;
  elm.draggable = data.draggable;
 },
 hidden: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.hidden) return;
  elm.hidden = data.hidden;
 },
 lang: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.lang) return;
  elm.lang = data.lang;
 },
 spellcheck: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.spellcheck) return;
  elm.spellcheck = data.spellcheck;
 },
 tabindex: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.tabindex) return;
  elm.tabIndex = data.tabindex;
 },
 translate: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.translate) return;
  elm.translate = data.translate;
 },
 th: (elm: any, data: ElementAttributes) => {
  if (!data.th) return;
  for (const key of Object.keys(data.th)) {
   if (elm[key]) {
    elm[key] = (data as any).th[key];
   }
  }
 },
 td: (elm: any, data: ElementAttributes) => {
  if (!data.td) return;
  for (const key of Object.keys(data.td)) {
   if (elm[key]) {
    elm[key] = (data as any).td[key];
   }
  }
 },
 img: (elm: any, data: ElementAttributes) => {
  if (!data.img) return;
  for (const key of Object.keys(data.img)) {
   if (elm[key]) {
    elm[key] = (data as any).img[key];
   }
  }
 },
 label: (elm: any, data: ElementAttributes) => {
  if (!data.label) return;
  for (const key of Object.keys(data.label)) {
   if (elm[key]) {
    elm[key] = (data as any).label[key];
   }
  }
 },
 input: (elm: any, data: ElementAttributes) => {
  if (!data.input) return;
  for (const key of Object.keys(data.input)) {
   if (elm[key]) {
    elm[key] = (data as any).input[key];
   }
  }
 },
 textarea: (elm: any, data: ElementAttributes) => {
  if (!data.textarea) return;
  for (const key of Object.keys(data.textarea)) {
   if (elm[key]) {
    elm[key] = (data as any).textarea[key];
   }
  }
 },
 audio: (elm: any, data: ElementAttributes) => {
  if (!data.audio) return;
  for (const key of Object.keys(data.audio)) {
   if (elm[key]) {
    elm[key] = (data as any).audio[key];
   }
  }
 },
 video: (elm: any, data: ElementAttributes) => {
  if (!data.video) return;
  for (const key of Object.keys(data.video)) {
   if (elm[key]) {
    elm[key] = (data as any).video[key];
   }
  }
 },
 track: (elm: any, data: ElementAttributes) => {
  if (!data.track) return;
  for (const key of Object.keys(data.track)) {
   if (elm[key]) {
    elm[key] = (data as any).track[key];
   }
  }
 },
 anchor: (elm: any, data: ElementAttributes) => {
  if (!data.anchor) return;
  for (const key of Object.keys(data.anchor)) {
   if (elm[key]) {
    elm[key] = (data as any).anchor[key];
   }
  }
 },
 form: (elm: any, data: ElementAttributes) => {
  if (!data.form) return;
  for (const key of Object.keys(data.form)) {
   if (elm[key]) {
    elm[key] = (data as any).form[key];
   }
  }
 },
 aria: (
  elm:
   | HTMLInputElement,
  data: ElementAttributes
 ) => {
  if (!data.aria) return;
  const aria = data.aria;
  if (aria.autocomplete) {
   elm.ariaAutoComplete = String(aria.autocomplete);
  }
  if (aria.checked) {
   elm.ariaChecked = String(aria.checked);
  }
  if (aria.disabled) {
   elm.ariaDisabled = String(aria.disabled);
  }
  if (aria.expanded) {
   elm.ariaExpanded = String(aria.expanded);
  }
  if (aria.haspopup) {
   elm.ariaHasPopup = String(aria.haspopup);
  }
  if (aria.hidden) {
   elm.ariaHidden = String(aria.hidden);
  }
  if (aria.label) {
   elm.ariaLabel = String(aria.label);
  }
  if (aria.modal) {
   elm.ariaModal = String(aria.modal);
  }
  if (aria.multiline) {
   elm.ariaMultiLine = String(aria.multiline);
  }
  if (aria.multiselecttable) {
   elm.ariaMultiSelectable = String(aria.multiselecttable);
  }
  if (aria.orientation) {
   elm.ariaOrientation = String(aria.orientation);
  }
  if (aria.placeholder) {
   elm.ariaPlaceholder = aria.placeholder;
  }
  if (aria.pressed) {
   elm.ariaPressed = String(aria.pressed);
  }
  if (aria.readyonly) {
   elm.ariaReadOnly = String(aria.readyonly);
  }
  if (aria.required) {
   elm.ariaRequired = String(aria.required);
  }
  if (aria.selected) {
   elm.ariaSelected = String(aria.selected);
  }
  if (aria.selected) {
   elm.ariaSelected = String(aria.selected);
  }
  if (aria.sort) {
   elm.ariaSort = String(aria.sort);
  }
  if (aria.valuemax) {
   elm.ariaValueMax = String(aria.valuemax);
  }
  if (aria.valuenow) {
   elm.ariaValueNow = String(aria.valuenow);
  }
  if (aria.valuemin) {
   elm.ariaValueMin = String(aria.valuemin);
  }
  if (aria.valuetext) {
   elm.ariaValueText = String(aria.valuetext);
  }
  if (aria.busy) {
   elm.ariaBusy = String(aria.busy);
  }
  if (aria.live) {
   elm.ariaLive = String(aria.live);
  }
  if (aria.live) {
   elm.ariaLive = String(aria.live);
  }
  if (aria.atomic) {
   elm.ariaAtomic = String(aria.atomic);
  }
  if (aria.colcount) {
   elm.ariaColCount = String(aria.colcount);
  }
  if (aria.colindex) {
   elm.ariaColIndex = String(aria.colindex);
  }
  if (aria.posinset) {
   elm.ariaPosInSet = String(aria.posinset);
  }
  if (aria.rowcount) {
   elm.ariaRowCount = String(aria.rowcount);
  }
  if (aria.rowindex) {
   elm.ariaRowIndex = String(aria.rowindex);
  }
  if (aria.rowspan) {
   elm.ariaRowSpan = String(aria.rowspan);
  }
  if (aria.setsize) {
   elm.ariaSetSize = String(aria.setsize);
  }
  if (aria.roledescription) {
   elm.ariaRoleDescription = String(aria.roledescription);
  }
  if (aria.keyshortcuts) {
   elm.ariaKeyShortcuts = String(aria.keyshortcuts);
  }
 },
 dataSet: (elm: HTMLElement, data: ElementAttributes) => {
  if (!data.dataSet) return;
  for (const dataKey of Object.keys(data.dataSet)) {
   elm.dataset[dataKey] = String(data.dataSet[dataKey]);
  }
 },
};

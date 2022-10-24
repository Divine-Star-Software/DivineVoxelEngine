export type HTMLInputTypes =
 | "button"
 | "checkbox"
 | "color"
 | "date"
 | "datetime-local"
 | "email"
 | "file"
 | "hidden"
 | "image"
 | "month"
 | "number"
 | "password"
 | "radio"
 | "range"
 | "reset"
 | "search"
 | "submit"
 | "tel"
 | "text"
 | "time"
 | "url"
 | "week";

export type ElementAttributes = {
 id?: string;
 className?: string;
 cssText?: string;
 dataSet?: Record<string, string>;
 accesskey ?: string;
 contenteditable ?: boolean;
 dir ?: string;
 draggable ?: boolean;
 hidden ?: boolean;
 lang ?: string;
 spellcheck ?: boolean;
 tabindex ?: number;
 translate ?: boolean;
 img?: {
  alt?: string;
  crossorigin?: "anonymous" | "use-credentials";
  width?: number;
  height?: number;
  ismap?: boolean;
  loading?: "eager" | "lazy";
  longdesc?: string;
  referrerpolicy?:
   | "no-referrer"
   | "no-referrer-when-downgrade"
   | "origin"
   | "origin-when-cross-origin"
   | "unsafe-url";
  sizes?: string;
  srcset?: string;
  usemap?: string;
 };
 anchor?: {
  download?: string;
  href?: string;
  hreflang?: string;
  meida?: string;
  ping?: string;
  referrerpolicy?:
   | "no-referrer"
   | "no-referrer-when-downgrade"
   | "origin"
   | "origin-when-cross-origin"
   | "same-origin"
   | "strict-origin-when-cross-origin"
   | "unsafe-url";
  rel:
   | "alternate"
   | "author"
   | "bookmark"
   | "external"
   | "help"
   | "license"
   | "next"
   | "nofollow"
   | "noreferrer"
   | "noopener"
   | "prev"
   | "search"
   | "tag";
  target?: "_blank" | "_parent" | "_self" | "_top";
  type?: string;
 };
 form?: {
  action?: string;
  method?: string;
  novalidate?: boolean;
  autocomplete?: boolean;
  acceptCharset?: string;
  enctype?: string;
 };
 label ?: {
    for ?: string;
    from ?: string;
 };
 input?: {
  accept?: string;
  alt?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  type?: HTMLInputTypes;
  value?: string | number;
  autocomplete?: "on" | "off";
  autofocus?: boolean;
  dirname?: string;
  form?: string;
  formaction?: string;
  formenctype?:
   | "application/x-www-form-urlencoded"
   | "multipart/form-data"
   | "text/plain";
  formmethod?: "get" | "post";
  formnovalidate?: boolean;
  formtarget?: string;
  height?: number;
  width?: number;
  list?: string;
  max?: number;
  maxlength?: number;
  min?: number;
  minlength?: number;
  multiple?: boolean;
  pattern?: string;
  readonly?: boolean;
  size?: number;
  src?: string;
  step?: number;
 };
 textarea?: {
  autofocus?: boolean;
  cols?: number;
  rows?: number;
  name?: string;
  placeholder?: string;
  dirname?: string;
  required?: boolean;
  disabled?: boolean;
  form?: string;
  maxlength?: boolean;
  wrap?: "hard" | "soft";
 };
 th ?: {
    abbr ?: string;
    colspan ?: number;
    rowspan ?: number;
    headers ?: string;
    scope ?: "col" | "colgroup" | "row" | "rowgroup"
 };
 td ?: {
    colspan ?: number;
    rowspan ?: number;
    headers ?: string;
 };
 audio?: {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "metadata" | "none";
  src?: string;
 };
 video?: {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "metadata" | "none";
  src?: string;
  poster?: string;
  width?: number;
  height?: number;
 };
 track?: {
  default?: boolean;
  kind?: "captions" | "chapters" | "descriptions" | "metadata" | "subtitles";
  label?: string;
  src?: string;
  srclang?: string;
 };
 aria?: {
  autocomplete?: boolean;
  checked?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  haspopup?: boolean;
  hidden?: boolean;
  label?: string;
  modal?: boolean;
  multiline?: boolean;
  multiselecttable?: boolean;
  orientation?: boolean;
  placeholder?: string;
  pressed?: boolean;
  readyonly?: boolean;
  required?: boolean;
  selected?: boolean;
  sort?: "ascending" | "descending" | "none" | "other";
  valuemax?: number;
  valuenow?: number;
  valuemin?: number;
  valuetext?: string;
  busy?: boolean;
  live?: "assertive" | "polite" | "off";
  atomic?: boolean;
  colcount?: number;
  colindex?: number;
  colspan?: number;
  posinset?: number;
  rowcount?: number;
  rowindex?: number;
  rowspan?: number;
  setsize?: number;
  roledescription?: string;
  keyshortcuts?: string;
 };
};
export type ElementAttributeList = keyof ElementAttributes;

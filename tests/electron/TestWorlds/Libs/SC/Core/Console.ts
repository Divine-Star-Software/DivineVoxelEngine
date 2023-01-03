import { TextProcessor } from "../Util/TextProcessor.js";

export const Console = {
 consoleMarker: "[★]> ",
 acitveText: "",
 activeTextCursor: {
  position: 0,
 },
 text: <string[]>[],

 startIndex: 0,
 textIndex: 0,
 maxLines: 0,

 history: <string[]>[],
 historyIndex: 0,

 $INIT() {
  let historyString = localStorage.getItem("console_history");
  let history = this.history;
  if (!historyString) {
   localStorage.setItem("console_history", JSON.stringify(history));
  } else {
   history = JSON.parse(historyString);
  }
  this.history = history;
  this.historyIndex = history.length;
 },


 centerAtBottom(){
  let start = this.text.length - this.maxLines;
  start = start < 0 ? start = 0 : start;
  this.startIndex = start;
 },

 clearActiveText() {
  this.acitveText = "";
  this.activeTextCursor.position = 0;
 },

 clearHistory() {
  this.history = [];
  this.historyIndex = 0;
  localStorage.setItem("console_history", JSON.stringify([]));
 },

 clear() {
  this.startIndex = 0;
  this.textIndex = 0;
  this.text = [];
  this.acitveText = "";
  this.activeTextCursor.position = 0;
 },

 addToActiveText(char: string) {
  this.acitveText =
   this.acitveText.substring(0, this.activeTextCursor.position) +
   char +
   this.acitveText.substring(
    this.activeTextCursor.position,
    this.acitveText.length
   );
  this.moveCursor("right");
 },
 removeFromActiveText() {
  if (this.activeTextCursor.position - 1 < 0) return;
  this.acitveText =
   this.acitveText.substring(0, this.activeTextCursor.position - 1) +
   this.acitveText.substring(
    this.activeTextCursor.position,
    this.acitveText.length
   );
  this.moveCursor("left");
 },

 addText(text: string) {
  const strings = TextProcessor.processText(text);
  this.text.push(...strings);
  this.textIndex++;
  if (this.textIndex > this.maxLines - 1) {
   this.startIndex += strings.length;
  }
 },

 addActiveText() {
  const text = Console.getActiveText(false);
  this.text.push(...text);
  this.textIndex += text.length;
  if (this.textIndex > this.maxLines - 1) {
   this.startIndex += text.length;
  }
 },

 moveCursor(direction: "left" | "right" | "up" | "down", scroll = false) {
  if (direction == "left") {
   if (this.activeTextCursor.position == 0) return;
   this.activeTextCursor.position--;
  }
  if (direction == "right") {
   if (this.activeTextCursor.position >= this.acitveText.length) return;
   this.activeTextCursor.position++;
  }
  if (scroll) {
   if (direction == "up") {
    if (this.startIndex == 0) return;
    this.startIndex--;
   }
   if (direction == "down") {
    if (this.startIndex + this.maxLines > this.text.length) return;
    this.startIndex++;
   }
   return;
  }

  if (direction == "up") {
   if (this.historyIndex <= 0) return;
   this.acitveText = this.history[this.historyIndex - 1];
   this.historyIndex--;
  }
  if (direction == "down") {
   if (this.historyIndex >= this.history.length) {
    this.acitveText = "";
    return;
   }
   this.historyIndex++;
   this.acitveText = this.history[this.historyIndex - 1];
   return;
  }
 },

 commit() {
  this.history.push(this.acitveText);
  this.historyIndex = this.history.length;
  localStorage.setItem("console_history", JSON.stringify(this.history));
 },

 getCursorPosition(ctx: CanvasRenderingContext2D) {
  const text = this.getActiveText()[0];
  const string = text.substring(
   0,
   this.activeTextCursor.position + this.consoleMarker.length
  );
  const data = ctx.measureText(string);
  return data.width;
 },

 getActiveText(cursor = true) {
  let activeText = this.acitveText;
  let text = `${this.consoleMarker}${activeText}`;
  return TextProcessor.processText(text);
 },
};

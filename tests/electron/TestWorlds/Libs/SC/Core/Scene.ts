import { TextProcessor } from "../Util/TextProcessor.js";
import { Console } from "./Console.js";

export const Scene = {
 ctx: <CanvasRenderingContext2D>{},

 dimensions: {
  width: 0,
  height: 0,
 },

 font: {
  size: 16,
  padding: 8,
 },

 startingY : 16,

 _bgColor: "rgba(0,0,0,0.2)",

 $INIT(context: CanvasRenderingContext2D) {
  this.ctx = context;
  const opacity = localStorage.getItem("console_opacity");
  if (opacity) {
   this.setOpacity(Number(opacity));
  } else {
   localStorage.setItem("console_opacity", "0.3");
   this.setOpacity(0.3);
  }
 },

 _setStyle() {
  this.ctx.fillStyle = "rgb(17,184,161)";
  this.ctx.font = `${this.font.size}px Consolas`;
 },
 _setActiveStyle() {
  this.ctx.fillStyle = "cyan";
  this.ctx.font = `${this.font.size}px Consolas`;
 },

 renderLog() {
  this.clearCanvas();
  let y = this.font.size;
  const consoleText = Console.text;
  for (
   let i = Console.startIndex;
   i < Console.startIndex + Console.maxLines;
   i++
  ) {
   if (consoleText[i] == undefined) break;
   const text = consoleText[i];
   this.clearLine(y - this.font.size);
   this._setStyle();
   this.ctx.fillText(text, 0, y);
   y += this.font.size + this.font.padding;
  }
 },

 _processText(text: string): string[] {
  return [text];
 },

 fullReRender() {
  this.renderLog();
  this.renderConsole();
 },
 setOpacity(value: number) {
  this._bgColor = `rgba(0,0,0,${value})`;
  this.fullReRender();
 },

 clearCanvas() {
  this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  this.ctx.fillStyle = this._bgColor;
  this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
 },

 clearLine(y: number) {
  this.ctx.clearRect(0, y, this.dimensions.width, this.font.size + 15);
  this.ctx.fillStyle = this._bgColor;
  this.ctx.fillRect(0, y, this.dimensions.width, this.font.size + 15);
 },

 renderConsole() {
  const text = Console.getActiveText();
  let line = Console.maxLines ;
  let y = (this.font.size + this.font.padding) * (line) + this.startingY;
  this._setActiveStyle();
  const position = Console.getCursorPosition(this.ctx);
  for (let i = 0; i < text.length; i++) {
   const string = text[i];
   this.clearLine(y - this.font.size);
   this._setActiveStyle();
   this.ctx.fillText("_", position, y + 5);
   this.ctx.fillText(string, 0, y);
   y += this.font.size + this.font.padding;
  }
 },

 resize(width: number, height: number) {
  this.dimensions.width = width;
  this.dimensions.height = height;
  Console.maxLines =
   ((this.dimensions.height / (this.font.size + this.font.padding)) >> 0) - 1;
 },
};

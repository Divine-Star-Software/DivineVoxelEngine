import { Browser } from "./Browser";
import { System } from "./Systemt";
import { NodeJS } from "./NodeJS";

export class Environment {
  static system = System;
  static browser = Browser;
  static nodeJS = NodeJS;
}

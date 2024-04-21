import { DivineControls } from "../DivineControls";
import { DCUser } from "./DCUser";

export class DCUserManager {
  static _users = new Map<number, DCUser>();

  static addUser(id: number) {
    if (this._users.has(id)) return this._users.get(id)!;
    const newUser = new DCUser(id);
    for (const [, input] of DivineControls.controls._nodes) {
      newUser.registerControl(input.data);
    }
    this._users.set(id, newUser);
    return newUser;
  }
  static getUser(id: number) {
    return this._users.get(id);
  }

  static updateControls() {
    for (const [, user] of this._users) {
      user.clearControls();
      for (const [, input] of DivineControls.controls._nodes) {
        user.registerControl(input.data);
      }
    }
  }
}

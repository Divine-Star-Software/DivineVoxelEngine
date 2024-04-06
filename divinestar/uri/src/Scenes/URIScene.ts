export abstract class URIScene<InternalScene extends any = unknown> {
  _scene: InternalScene;
  abstract registerBeforeRender(run: Function): void;
  abstract unRegisterBeforeRender(run: Function): void;
}

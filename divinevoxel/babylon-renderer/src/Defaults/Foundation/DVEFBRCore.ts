import { DVEBabylonRenderer } from "../../DVEBabylonRenderer.js";

import {
  DVEFRenderCore,
  DVEFRenderCoreProps,
} from "@divinevoxel/foundation/Contexts/Render/DVEFRenderCore";

export type DVEFBRCoreProps = {
  renderer: DVEBabylonRenderer;
} & DVEFRenderCoreProps;

export class DVEFBRCore extends DVEFRenderCore {
  static instance: DVEFBRCore;
  renderer: DVEBabylonRenderer;
  async init() {}

  constructor(props: DVEFBRCoreProps) {
    super(props);
    DVEFBRCore.instance = this;
    this.renderer = props.renderer;
  }
}

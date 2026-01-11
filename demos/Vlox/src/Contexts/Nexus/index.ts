import { StartNexus } from "@divinevoxel/vlox/Init/StartNexus";

const DVEN = await StartNexus();

(self as any).DVEN = DVEN;

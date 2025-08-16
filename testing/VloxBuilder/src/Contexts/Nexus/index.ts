import { StartNexus } from "@divinevoxel/vlox/Init/StartNexus";
import { DVEPhysics } from "@dvegames/vlox/Physics/Nexus/DVEPhysics";
const DVEN = await StartNexus();
DVEPhysics.init(DVEN);
DVEPhysics.start();


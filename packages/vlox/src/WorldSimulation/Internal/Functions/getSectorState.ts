import { SectorState } from "../Classes/SectorState";
import { WorldRegister } from "../../../World/WorldRegister";
import { $2dMooreNeighborhood } from "../../../Math/CardinalNeighbors";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { Sector } from "../../../World/index";
import { DimensionSegment } from "../Classes/DimensionSegment";
import { Vector3Like } from "@amodx/math";
const tempPosition = Vector3Like.Create();
export function getSectorState(
  sector: Sector,
  state: SectorState,
  segment: DimensionSegment
): SectorState {
  state.resset();

  const [cx, cy, cz] = sector.position;

  for (let i = 0; i < $2dMooreNeighborhood.length; i++) {
    const sectorPOS = WorldSpaces.sector.getPosition(
      cx + $2dMooreNeighborhood[i][0] * WorldSpaces.sector.bounds.x,
      cy,
      cz + $2dMooreNeighborhood[i][1] * WorldSpaces.sector.bounds.z,
      tempPosition
    );
    if (!segment.vistedMap.has(sectorPOS.x, cy, sectorPOS.z)) {
      segment.queue.push(sectorPOS.x, cy, sectorPOS.z);
    }
    const sector = WorldRegister.sectors.get(
      segment.id,
      sectorPOS.x,
      cy,
      sectorPOS.z
    );
    if (!sector) {
      state.genAlldone = false;
      state.nWorldGenAllDone = false;
      state.nPropagtionAllDone = false;
      state.nSunAllDone = false;
      state.nDecorAllDone = false;
      state.allLoaded = false;
      break;
    }

    if (!sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
      state.nWorldGenAllDone = false;
    }
    if (!sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)) {
      state.nDecorAllDone = false;
    }
    if (!sector.getBitFlag(Sector.FlagIds.isWorldSunDone)) {
      state.nSunAllDone = false;
    }
    if (!sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)) {
      state.nPropagtionAllDone = false;
    }
  }
  return state;
}

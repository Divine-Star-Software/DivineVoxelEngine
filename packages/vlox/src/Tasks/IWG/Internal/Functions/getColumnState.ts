import { ColumnState } from "../Classes/ColumnState";
import { WorldRegister } from "../../../../World/WorldRegister";
import { ColumnStructIds } from "../../../../World/Column/ColumnStructIds";
import { $2dMooreNeighborhood } from "../../../../Math/Constants/CardinalNeighbors";
import { WorldSpaces } from "../../../../World/WorldSpaces";
import { Column } from "../../../../World/index";
import { DimensionSegment } from "../Classes/DimensionSegment";
export function getColumnState(
  column:Column,
  state: ColumnState,
  segment: DimensionSegment
): ColumnState {
  state.resset();

  const [cx,cy,cz] = column.position;

  Column.StateStruct.setData(column.columnState);
  for (let i = 0; i < $2dMooreNeighborhood.length; i++) {
    const columnPOS = WorldSpaces.column.getPositionXYZ(
      cx + $2dMooreNeighborhood[i][0] * WorldSpaces.column.bounds.x,
      cy,
      cz + $2dMooreNeighborhood[i][1] * WorldSpaces.column.bounds.z
    );
    if (!segment.vistedMap.has(columnPOS.x, cy, columnPOS.z)) {
      segment.queue.push(columnPOS.x, cy, columnPOS.z);
    }
    const column = WorldRegister.column.get(columnPOS.x, cy, columnPOS.z);
    if (!column) {
      state.genAlldone = false;
      state.nWorldGenAllDone = false;
      state.nPropagtionAllDone = false;
      state.nSunAllDone = false;
      state.nDecorAllDone = false;
      state.allLoaded = false;
      break;
    }
    Column.StateStruct.setData(column.columnState);

    if (!Column.StateStruct.getProperty(ColumnStructIds.isWorldGenDone)) {
      state.nWorldGenAllDone = false;
    }
    if (!Column.StateStruct.getProperty(ColumnStructIds.isWorldDecorDone)) {
      state.nDecorAllDone = false;
    }
    if (!Column.StateStruct.getProperty(ColumnStructIds.isWorldSunDone)) {
      state.nSunAllDone = false;
    }
    if (
      !Column.StateStruct.getProperty(ColumnStructIds.isWorldPropagationDone)
    ) {
      state.nPropagtionAllDone = false;
    }
  }
  return state;
}

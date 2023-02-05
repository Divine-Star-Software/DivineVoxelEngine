import { StairStates } from "../../../../out/Data/Shapes/StairStates.js";
export function GenerateStairPillar(brush, sx, sy, sz, height, stairId, pillarId) {
    brush
        .setId(stairId)
        .setXYZ(sx - 1, sy, sz)
        .setShapeState(StairStates.normal.bottom.east)
        .paint()
        .setXYZ(sx + 1, sy, sz)
        .setShapeState(StairStates.normal.bottom.west)
        .paint()
        .setXYZ(sx, sy, sz - 1)
        .setShapeState(StairStates.normal.bottom.north)
        .paint()
        .setXYZ(sx, sy, sz + 1)
        .setShapeState(StairStates.normal.bottom.south)
        .paint()
        .setXYZ(sx - 1, sy, sz - 1)
        .setShapeState(StairStates.connected.bottom.northEast)
        .paint()
        .setXYZ(sx - 1, sy, sz + 1)
        .setShapeState(StairStates.connected.bottom.southEast)
        .paint()
        .setXYZ(sx + 1, sy, sz - 1)
        .setShapeState(StairStates.connected.bottom.northWest)
        .paint()
        .setXYZ(sx + 1, sy, sz + 1)
        .setShapeState(StairStates.connected.bottom.southWest)
        .paint()
        .setXYZ(sx - 1, sy + height, sz)
        .setShapeState(StairStates.normal.top.east)
        .paint()
        .setXYZ(sx + 1, sy + height, sz)
        .setShapeState(StairStates.normal.top.west)
        .paint()
        .setXYZ(sx, sy + height, sz - 1)
        .setShapeState(StairStates.normal.top.north)
        .paint()
        .setXYZ(sx, sy + height, sz + 1)
        .setShapeState(StairStates.normal.top.south)
        .paint()
        .setXYZ(sx - 1, sy + height, sz - 1)
        .setShapeState(StairStates.connected.top.northEast)
        .paint()
        .setXYZ(sx - 1, sy + height, sz + 1)
        .setShapeState(StairStates.connected.top.southEast)
        .paint()
        .setXYZ(sx + 1, sy + height, sz - 1)
        .setShapeState(StairStates.connected.top.northWest)
        .paint()
        .setXYZ(sx + 1, sy + height, sz + 1)
        .setShapeState(StairStates.connected.top.southWest)
        .paint();
    brush.setId(pillarId).setShapeState(0);
    let i = sy + height;
    while (i > sy) {
        brush.setXYZ(sx, i, sz).paint();
        i--;
    }
    brush.setShapeState(0);
}

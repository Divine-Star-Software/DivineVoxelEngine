import { WorldMapTile } from "./WorldMapTile";
import { WorldMapTilesRegister } from "./WorldMapTilesRegister";
import { EntityTool } from "@divinevoxel/core/Render/Tools/EntityTool";
import {
  Scene,
  Mesh,
  VertexBuffer,
  StandardMaterial,
  ShaderMaterial,
} from "@babylonjs/core";
import { LocationData } from "@divinestar/voxelspaces";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces";
import { $2dMooreNeighborhood } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";
import { Distance3D, Vec3Array } from "@divinevoxel/core/Math";
import { WorldMapTileMaterial } from "./WorldMapTileMaterial";
export class WorldMap {
  static Constants = {
    MAX_TILES: 2_000,
  };

  tilesRegister = new WorldMapTilesRegister(this);

  tilesMaterial: ShaderMaterial;

  _instanceTool: EntityTool;
  _instanceMesh: Mesh;
  _previousLocation: LocationData;
  _searchQueue: Vec3Array[] = [];
  _visitedMap: Map<string, boolean> = new Map();
  constructor() {}

  init(scene: Scene) {
    const quadData = WorldMapTile.GetQuad();
    this._instanceMesh = new Mesh("world-map-tile-base", scene);
    this._instanceMesh.setVerticesData(
      VertexBuffer.PositionKind,
      quadData.positions
    );
    this._instanceMesh.setVerticesData(
      VertexBuffer.NormalKind,
      quadData.normals
    );
    this._instanceMesh.setVerticesData(VertexBuffer.UVKind, quadData.uvs);
    this._instanceMesh.setIndices(quadData.indicies);
    this._instanceTool = new EntityTool(this._instanceMesh);
    this._instanceTool.setInstanceAmount(WorldMap.Constants.MAX_TILES);
    this.tilesMaterial = WorldMapTileMaterial.create(scene);

    this._instanceMesh.material = this.tilesMaterial;
  }

  updateTiles(location: LocationData) {
    if (!this._previousLocation) {
      this._previousLocation = [...location];
    }

    const worldColumnPOS = WorldSpaces.column
      .getPositionXYZ(location[1], 0, location[3])
      .copy();

    this._searchQueue.push([
      worldColumnPOS.x,
      worldColumnPOS.y,
      worldColumnPOS.z,
    ]);

    while (this._searchQueue.length) {
      const node = this._searchQueue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);

      if (this._visitedMap.has(columnKey)) continue;
      this._visitedMap.set(columnKey, true);

      const distance = Distance3D(
        worldColumnPOS.x,
        0,
        worldColumnPOS.z,
        cx,
        0,
        cz
      );
      if (distance > 100) continue;

      for (const n of $2dMooreNeighborhood) {
        const nx = cx + n[0] * WorldSpaces.column._bounds.x;
        const nz = cz + n[1] * WorldSpaces.column._bounds.z;
        const columnPOS = WorldSpaces.column.getPositionXYZ(nx, cy, nz),
          key = WorldSpaces.column.getKey();
        if (!this._visitedMap.has(key)) {
          this._searchQueue.push([columnPOS.x, cy, columnPOS.z]);
        }
      }

      if (!this.tilesRegister.column.get([location[0], cx, 0, cz])) {
        this.tilesRegister.column.add([location[0], cx, 0, cz]);
      }
    }

    this._instanceTool.update();
    this._visitedMap.clear();
  }
}

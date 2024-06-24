import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import {
  CompassDirectionVoxelFaceMap,
  VoxelFaceCompassDirectionMap,
  VoxelFaceDirections,
  VoxelFaces,
} from "@divinevoxel/core/Math/index.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import {
  QuadScalarVertexData,
  QuadVertexData,
} from "@amodx/meshing/Classes/QuadVertexData.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import {
  AMath,
  CompassAngles,
  CompassDirections,
  Directions,
  Mat3Array,
  Matrix3x3Like,
  Vec2Array,
  Vec3Array,
  Vector3Like,
} from "@amodx/math";
import { ShapeTool } from "../../ShapeTool.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { StairStates } from "./StairStates.js";

const fullUVs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];
const topHalfUVs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0.5],
  [1, 0.5],
];
const bottomHalfUVs: QuadUVData = [
  [1, 0.5],
  [0, 0.5],
  [0, 0],
  [1, 0],
];

const upperRightQuaterUvs: QuadUVData = [
  [1, 1],
  [0.5, 1],
  [0.5, 0.5],
  [1, 0.5],
];
const bottomLeftQuaterUvs: QuadUVData = [
  [0.5, 0.5],
  [0, 0.5],
  [0, 0],
  [0.5, 0],
];

enum AO {
  None = -1,
  Dark = -2,
  ExtraDark = -3,
  Center = -4,
  CenterTopLeft = -5,
  CenterBottomLeft = -6,
  HalfLeft = -7,
  HalfRight = -8,
}

type QuadShadeData = [AO | QuadVerticies, QuadVerticies];

const creteShading = (
  v1: Vec2Array,
  v2: Vec2Array,
  v3: Vec2Array,
  v4: Vec2Array
) => {
  return new QuadVertexData<QuadShadeData>({
    [QuadVerticies.TopRight]: v1,
    [QuadVerticies.TopLeft]: v2,
    [QuadVerticies.BottomLeft]: v3,
    [QuadVerticies.BottomRight]: v4,
  });
};

const normalShading = creteShading(
  [QuadVerticies.TopRight, QuadVerticies.TopRight],
  [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
  [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
  [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
);

type QuadPath = [start: Vec3Array, end: Vec3Array];

type StairQuadData = [
  QuadPath,
  uvs: QuadUVData,
  QuadVertexData<QuadShadeData> | QuadVertexData<QuadShadeData>[]
][];
type FinalStairQuadData = [Quad, QuadVertexData<QuadShadeData>][];

type StairShapeState = Record<VoxelFaces, StairQuadData>;
type FinalStairShapeState = Record<VoxelFaces, FinalStairQuadData>;

const sideBottomShade = [
  creteShading(
    [AO.HalfRight, QuadVerticies.TopRight],
    [AO.HalfLeft, QuadVerticies.TopLeft],
    [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
    [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
  ),
  creteShading(
    [QuadVerticies.TopRight, QuadVerticies.TopRight],
    [QuadVerticies.TopLeft, QuadVerticies.TopLeft],
    [AO.HalfRight, QuadVerticies.BottomLeft],
    [AO.HalfLeft, QuadVerticies.BottomRight]
  ),
];
const sideTopShade = [
  creteShading(
    [QuadVerticies.TopRight, QuadVerticies.TopRight],
    [AO.CenterTopLeft, QuadVerticies.TopLeft],
    [AO.Center, QuadVerticies.BottomLeft],
    [AO.HalfRight, QuadVerticies.BottomRight]
  ),
  creteShading(
    [AO.HalfRight, QuadVerticies.TopRight],
    [AO.Center, QuadVerticies.TopLeft],
    [AO.Center, QuadVerticies.BottomLeft],
    [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
  ),
];

const DefaultStair: StairShapeState = {
  [VoxelFaces.Top]: [
    //top split face
    [
      [
        [0, 0.5, 0],
        [1, 0.5, 0.5],
      ],
      bottomHalfUVs,
      creteShading(
        [AO.Dark, QuadVerticies.BottomLeft],
        [AO.Dark, QuadVerticies.BottomRight],
        [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
      ),
    ],
    [
      [
        [0, 1, 0.5],
        [1, 1, 1],
      ],
      topHalfUVs,
      creteShading(
        [QuadVerticies.TopRight, QuadVerticies.BottomRight],
        [QuadVerticies.TopLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
      ),
    ],
  ],
  [VoxelFaces.Bottom]: [
    //bottom full face
    [
      [
        [0, 0, 0],
        [1, 0, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.North]: [
    //north box face
    [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.South]: [
    //south split face
    [
      [
        [0, 0, 0],
        [1, 0.5, 0],
      ],
      bottomHalfUVs,
      [
        creteShading(
          [AO.None, QuadVerticies.BottomRight],
          [AO.None, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        creteShading(
          [QuadVerticies.TopRight, QuadVerticies.BottomRight],
          [QuadVerticies.TopLeft, QuadVerticies.BottomLeft],
          [AO.HalfLeft, QuadVerticies.BottomLeft],
          [AO.HalfRight, QuadVerticies.BottomRight]
        ),
      ],
    ],
    [
      [
        [0, 0.5, 0.5],
        [1, 1, 0.5],
      ],
      topHalfUVs,
      [
        creteShading(
          [QuadVerticies.TopRight, QuadVerticies.BottomRight],
          [QuadVerticies.TopLeft, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight]
        ),
        creteShading(
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomRight],
          [QuadVerticies.BottomRight, QuadVerticies.BottomLeft]
        ),
      ],
    ],
  ],
  [VoxelFaces.East]: [
    //east split face
    [
      [
        [1, 0, 0],
        [1, 0.5, 1],
      ],
      bottomHalfUVs,
      sideBottomShade,
    ],
    [
      [
        [1, 0.5, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      sideTopShade,
    ],
  ],
  [VoxelFaces.West]: [
    //west split face
    [
      [
        [0, 0, 0],
        [0, 0.5, 1],
      ],
      bottomHalfUVs,
      sideBottomShade,
    ],
    [
      [
        [0, 0.5, 0.5],
        [0, 1, 1],
      ],
      bottomLeftQuaterUvs,
      sideTopShade,
    ],
  ],
};

//bottom north east up right
const DefaultConnectedStair: StairShapeState = {
  [VoxelFaces.Top]: [
    //top split face
    [
      [
        [0, 0.5, 0],
        [1, 0.5, 1],
      ],
      fullUVs,
      creteShading(
        [AO.ExtraDark, QuadVerticies.BottomRight],
        [QuadVerticies.TopLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
        [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
      ),
    ],

    [
      [
        [0.5, 1, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      creteShading(
        [QuadVerticies.TopRight, QuadVerticies.BottomRight],
        [AO.CenterTopLeft, QuadVerticies.BottomLeft],
        [AO.Center, QuadVerticies.BottomLeft],
        [AO.HalfRight, QuadVerticies.BottomRight]
      ),
    ],
  ],
  [VoxelFaces.Bottom]: [
    //bottom full face
    [
      [
        [0, 0, 0],
        [1, 0, 1],
      ],
      fullUVs,
      normalShading,
    ],
  ],
  [VoxelFaces.North]: [
    //north box face
    [
      [
        [0, 0, 1],
        [1, 0.5, 1],
      ],
      bottomHalfUVs,
      sideBottomShade,
    ],
    [
      [
        [0.5, 0.5, 1],
        [1, 1, 1],
      ],
      bottomHalfUVs,
      sideTopShade,
    ],
  ],
  [VoxelFaces.South]: [
    //south split face
    [
      [
        [0, 0, 0],
        [1, 0.5, 0],
      ],
      bottomHalfUVs,
      [
        creteShading(
          [AO.None, QuadVerticies.BottomRight],
          [AO.None, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomLeft],
          [QuadVerticies.BottomRight, QuadVerticies.BottomRight]
        ),
        creteShading(
          [QuadVerticies.TopRight, QuadVerticies.BottomRight],
          [QuadVerticies.TopLeft, QuadVerticies.BottomLeft],
          [AO.HalfLeft, QuadVerticies.BottomLeft],
          [AO.HalfRight, QuadVerticies.BottomRight]
        ),
      ],
    ],
    [
      [
        [0.5, 0.5, 0.5],
        [1, 1, 0.5],
      ],
      upperRightQuaterUvs,
      [
        creteShading(
          [QuadVerticies.TopRight, QuadVerticies.BottomRight],
          [AO.CenterTopLeft, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight]
        ),
        creteShading(
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomRight],
          [QuadVerticies.BottomRight, QuadVerticies.BottomLeft]
        ),
      ],
    ],
  ],
  [VoxelFaces.East]: [
    //east split face
    [
      [
        [1, 0, 0],
        [1, 0.5, 1],
      ],
      bottomHalfUVs,
      sideBottomShade,
    ],
    [
      [
        [1, 0.5, 0.5],
        [1, 1, 1],
      ],
      upperRightQuaterUvs,
      sideTopShade,
    ],
  ],
  [VoxelFaces.West]: [
    //west split face
    [
      [
        [0, 0, 0],
        [0, 0.5, 1],
      ],
      bottomHalfUVs,
      sideBottomShade,
    ],
    [
      [
        [0.5, 0.5, 0.5],
        [0.5, 1, 1],
      ],
      bottomLeftQuaterUvs,
      [
        creteShading(
          [QuadVerticies.TopRight, QuadVerticies.BottomRight],
          [AO.CenterTopLeft, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight]
        ),
        creteShading(
          [AO.Dark, QuadVerticies.BottomLeft],
          [AO.Dark, QuadVerticies.BottomRight],
          [QuadVerticies.BottomLeft, QuadVerticies.BottomRight],
          [QuadVerticies.BottomRight, QuadVerticies.BottomLeft]
        ),
      ],
    ],
  ],
};
const deg90 = AMath.DegreesToRadians(90);
const deg180 = AMath.DegreesToRadians(180);
const deg270 = AMath.DegreesToRadians(270);
const pivoit: Vec3Array = [0.5, 0.5, 0.5];

const mapQuads = (
  quads: StairQuadData,
  orientation: 0 | 1 = 0
): FinalStairQuadData => {
  const final: FinalStairQuadData = [];

  for (const _ of quads) {
    let quad = Quad.Create(_[0], _[1], false, orientation);
    final.push([quad, _[2] as any]);
  }

  return final;
};

const upsideDownMatrix = Matrix3x3Like.RotationZ(AMath.DegreesToRadians(180));
const flipMatrix = Matrix3x3Like.Scaling(1, -1, 1);

const applyMatrix = (
  points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
  scaleMatrix: null | Mat3Array,
  rotationMatrix: [string | null, Mat3Array] | null = null
): any => {
  if (rotationMatrix) {
    points = points.map((vector) => {
      return Vector3Like.RotateAroundPivotArray(
        rotationMatrix[1],
        vector,
        pivoit
      );
    }) as any;
    if (rotationMatrix[0]) {
      points = Quad.OrderQuadVertices(points, rotationMatrix[0] as any);
    }
  }

  if (scaleMatrix) {
    points = points.map((vector) => {
      vector = Vector3Like.ApplyMatrixArray(flipMatrix, vector);
      vector[1] += 1;
      return vector;
    }) as any;
    points = [points[3], points[2], points[1], points[0]];
  }

  return points;
};

const createRototation = (
  rotation: number,
  data: StairShapeState,
  upsideDown = false
) => {
  const matrix = Matrix3x3Like.RotationY(rotation + (upsideDown ? 0 : 0));
  data = structuredClone(data);
  const newData: StairShapeState = {
    [VoxelFaces.Top]: [],
    [VoxelFaces.Bottom]: data[VoxelFaces.Bottom],
    [VoxelFaces.North]: [],
    [VoxelFaces.South]: [],
    [VoxelFaces.East]: [],
    [VoxelFaces.West]: [],
  };

  if (!upsideDown) {
    newData[VoxelFaces.Bottom] = data[VoxelFaces.Bottom];
    newData[VoxelFaces.Top] = data[VoxelFaces.Top].map((_) => [
      applyMatrix(Quad.CalculateQuadPoints(..._[0]).points, null, [
        null,
        matrix,
      ]) as any,
      _[1],
      _[2],
    ]);
  } else {
    newData[VoxelFaces.Top] = data[VoxelFaces.Bottom].map((_) => [
      Quad.OrderQuadVertices(
        applyMatrix(
          Quad.CalculateQuadPoints(..._[0]).points,
          upsideDownMatrix,
          null
        ),
        "up"
      ) as any,
      _[1],
      _[2],
    ]);

    newData[VoxelFaces.Bottom] = data[VoxelFaces.Top].map((_) => [
      applyMatrix(Quad.CalculateQuadPoints(..._[0]).points, upsideDownMatrix, [
        "up",
        matrix,
      ]) as any,
      _[1],
      _[2],
    ]);
  }

  const faces = [
    VoxelFaces.North,
    VoxelFaces.South,
    VoxelFaces.West,
    VoxelFaces.East,
  ];
  for (const face of faces) {
    const newDirection =
      CompassDirectionVoxelFaceMap[
        Directions.Rotate(VoxelFaceCompassDirectionMap[face], rotation)
      ];

    newData[newDirection] = data[face].map((_) => [
      applyMatrix(
        Quad.CalculateQuadPoints(..._[0]).points,
        upsideDown ? upsideDownMatrix : null,
        [VoxelFaceCompassDirectionMap[newDirection], matrix]
      ),
      _[1],
      Array.isArray(_[2]) ? (upsideDown ? _[2][1] : _[2][0]) : _[2],
    ]);
  }

  return {
    [VoxelFaces.Top]: mapQuads(newData[VoxelFaces.Top], 0),
    [VoxelFaces.Bottom]: mapQuads(newData[VoxelFaces.Bottom], 1),
    [VoxelFaces.North]: mapQuads(newData[VoxelFaces.North], 1),
    [VoxelFaces.South]: mapQuads(newData[VoxelFaces.South], 0),
    [VoxelFaces.East]: mapQuads(newData[VoxelFaces.East], 0),
    [VoxelFaces.West]: mapQuads(newData[VoxelFaces.West], 1),
  };
};

const StairShapeStates: Record<StairStates, FinalStairShapeState> = {
  [StairStates.BottomNorth]: createRototation(0, DefaultStair),
  [StairStates.BottomSouth]: createRototation(deg180, DefaultStair),
  [StairStates.BottomEast]: createRototation(deg90, DefaultStair),
  [StairStates.BottomWest]: createRototation(deg270, DefaultStair),
  [StairStates.TopNorth]: createRototation(0, DefaultStair, true),
  [StairStates.TopSouth]: createRototation(deg180, DefaultStair, true),
  [StairStates.TopEast]: createRototation(deg90, DefaultStair, true),
  [StairStates.TopWest]: createRototation(deg270, DefaultStair, true),
  [StairStates.BottomNorthEast]: createRototation(0, DefaultConnectedStair),
  [StairStates.BottomNorthWest]: createRototation(
    deg180,
    DefaultConnectedStair
  ),
  [StairStates.BottomSouthEast]: createRototation(deg90, DefaultConnectedStair),
  [StairStates.BottomSouthWest]: createRototation(
    deg270,
    DefaultConnectedStair
  ),
  [StairStates.TopNorthEast]: createRototation(0, DefaultConnectedStair),
  [StairStates.TopNorthWest]: createRototation(
    deg180,
    DefaultConnectedStair,
    true
  ),
  [StairStates.TopSouthEast]: createRototation(
    deg90,
    DefaultConnectedStair,
    true
  ),
  [StairStates.TopSouthWest]: createRototation(
    deg270,
    DefaultConnectedStair,
    true
  ),
};

const getStairQuads = (
  shapeState: number,
  face: VoxelFaces
): FinalStairQuadData => {
  return StairShapeStates[shapeState as StairStates][face];
};

const tempAO = new QuadScalarVertexData();
const tempLight = new QuadScalarVertexData();

const updateShaded = (
  vertices: QuadVerticies,
  worldAO: QuadScalarVertexData,
  worldLight: QuadScalarVertexData,
  shaded: QuadVertexData<QuadShadeData>
) => {
  const shadedTopRightAO = shaded.vertices[vertices][0];

  switch (shadedTopRightAO) {
    case AO.None:
      worldAO.vertices[vertices] = 1;
      break;
    case AO.Dark:
      worldAO.vertices[vertices] = 7;
      break;
    case AO.ExtraDark:
      worldAO.vertices[vertices] = 15;
      break;
    case AO.Center:
      worldAO.vertices[vertices] = Math.floor(
        (Math.floor(
          (tempAO.vertices[QuadVerticies.TopRight] +
            tempAO.vertices[QuadVerticies.TopLeft]) /
            2
        ) +
          Math.floor(
            (tempAO.vertices[QuadVerticies.BottomLeft] +
              tempAO.vertices[QuadVerticies.BottomRight]) /
              2
          )) /
          2
      );
      break;
    case AO.CenterTopLeft:
      worldAO.vertices[vertices] = Math.floor(
        (tempAO.vertices[QuadVerticies.TopRight] +
          tempAO.vertices[QuadVerticies.TopLeft]) /
          2
      );
      break;
    case AO.CenterBottomLeft:
      worldAO.vertices[vertices] = Math.floor(
        (tempAO.vertices[QuadVerticies.BottomLeft] +
          tempAO.vertices[QuadVerticies.BottomRight]) /
          2
      );
      break;
    case AO.HalfLeft:
      worldAO.vertices[vertices] = Math.floor(
        (tempAO.vertices[QuadVerticies.BottomLeft] +
          tempAO.vertices[QuadVerticies.TopLeft]) /
          2
      );
      break;
    case AO.HalfRight:
      worldAO.vertices[vertices] = Math.floor(
        (tempAO.vertices[QuadVerticies.BottomRight] +
          tempAO.vertices[QuadVerticies.TopRight]) /
          2
      );
      break;
    default:
      worldAO.vertices[vertices] = tempAO.vertices[shadedTopRightAO];
      break;
  }

  const shadedTopRightLight = shaded.vertices[vertices][1];
  worldLight.vertices[vertices] = tempLight.vertices[shadedTopRightLight];
};

const addStairQuads = (face: VoxelFaces) => {
  const quads = getStairQuads(ShapeTool.data.voxel.getShapeState(), face);
  const worldLight = ShapeTool.data.getWorldLight();
  const worldAO = ShapeTool.data.getWorldAO();
  tempAO.setFromQuadData(worldAO);
  tempLight.setFromQuadData(worldLight);

  for (const [quad, shaded] of quads) {
    updateShaded(QuadVerticies.TopRight, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.TopLeft, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.BottomLeft, worldAO, worldLight, shaded);
    updateShaded(QuadVerticies.BottomRight, worldAO, worldLight, shaded);

    VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, quad);
  }
};

class StairVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_stair";
  init() {
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        return data.default;
      }
    );
    /*    OverrideManager.AOFlipFace.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        if (data.face == VoxelFaces.Top || data.face == VoxelFaces.Bottom)
          return true;
        return false;
      }
    ); */
  }
  add = {
    top() {
      addStairQuads(VoxelFaces.Top);
    },
    bottom() {
      addStairQuads(VoxelFaces.Bottom);
    },
    north() {
      addStairQuads(VoxelFaces.North);
    },
    south() {
      addStairQuads(VoxelFaces.South);
    },
    east() {
      addStairQuads(VoxelFaces.East);
    },
    west() {
      addStairQuads(VoxelFaces.West);
    },
  };
}

export const StairVoxelShape = new StairVoxelShapeClass();

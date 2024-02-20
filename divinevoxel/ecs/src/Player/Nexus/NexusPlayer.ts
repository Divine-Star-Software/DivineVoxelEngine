
import { EntityBase } from "../../Physics/Entities/EntityBase.js";
import { Vector3 } from "@divinevoxel/core/Math/index.js";
import { Scalar } from "@divinevoxel/core/Math/Classes/Scalar.js";
import {
  PlayerPhysicsData,
  PlayerPhysicsStatesValues,
} from "../Data/PlayerPhysicsData.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { ValueEaseAndTween } from "../../Math/EaseAndTween.js";
import { DVP } from "../../Physics";

export class NexusPlayer extends EntityBase {
  states = {
    cilmbingStair: false,
    inWater: false,
    onLadder: false,
    gravity: -0.1,
    jumping: false,
    canJump: true,
    jumpVelocity: 0.15,
    onGround: false,
    climbing: false,
  };
  get position() {
    return this.node.position;
  }
  materialStandingOn = "none";
  sideDirection = new Vector3(0, 0, 0);
  forwardDirection = new Vector3(0, 0, 0);
  speed = 0.04;
  runSpeed = 0.03;

  tweens = {
    jump: new ValueEaseAndTween({
      start: 0,
      end: 1,
      max: 20,
      function: ValueEaseAndTween.EaseInQuad,
      onUpdate: (percent) => {
        this.node.acceleration.y = 1 - percent;
      },
      onDone: () => {
        this.node.acceleration.y = 0;
        this.states.jumping = false;
      },
    }),
    fall: new ValueEaseAndTween({
      start: 0,
      end: 1.5,
      max: 20,
      function: ValueEaseAndTween.EaseInQuad,
      onUpdate: (percent) => {
        this.node.acceleration.y = percent;
      },
      onDone: () => {
        this.node.acceleration.y = 1.5;
        this.tweens.fall.setAlive(false);
      },
    }),
    walk: new ValueEaseAndTween({
      start: 0,
      end: 1,
      max: 20,
      function: ValueEaseAndTween.EaseOutQuad,
      onUpdate: (percent) => {
        this.node.acceleration.x = percent;
        this.node.acceleration.z = percent;
      },
      onDone: () => {
        this.node.acceleration.x = 1;
        this.node.acceleration.z = 1;
        this.tweens.walk.setAlive(false);
      },
    }),
    stop: new ValueEaseAndTween({
      start: 0,
      end: 1,
      max: 20,
      function: ValueEaseAndTween.EaseOutQuad,
      onUpdate: (percent) => {
        this.node.acceleration.x = 1 - percent;
        this.node.acceleration.z = 1 - percent;
      },
      onDone: () => {
        this.node.acceleration.x = 0;
        this.node.acceleration.z = 0;
        this.tweens.stop.setAlive(false);
      },
    }),
  };

  constructor(
    public physics: PlayerPhysicsData,
    public stats: PlayerStatsData
  ) {
    super();
    this.node.boundingBox.update(0.8, 1, 0.8);
    this.node.setCollisionHanlder((collider, collisionNode, dataTool) => {
      if (collisionNode.results.faceHit.top() && collider.isSolid) {
        this.states.onGround = true;
        this.materialStandingOn = dataTool.getMaterial();
      }

      if (
        (collider.id == "stair-bottom" || collider.id == "stair-top") &&
        collisionNode.results.collided()
      ) {
        if (collisionNode.results.faceHit.north()) {
          this.states.cilmbingStair = true;
          return;
        }
        if (collisionNode.results.faceHit.top()) {
          this.states.cilmbingStair = false;
          return;
        }
      }

      this.states.cilmbingStair = false;
    });
  }
  _lastVelocity = new Vector3(0, 0, 0);

  controlsUpdate() {
    this.forwardDirection.set(
      this.physics.direction.x,
      0,
      this.physics.direction.z
    );
    this.sideDirection.set(
      this.physics.sideDirection.x,
      0,
      this.physics.sideDirection.z
    );

    if (
      this.physics.states.movement == PlayerPhysicsStatesValues.walkingBackward
    ) {
      this.forwardDirection.scaleXYZ(-1);
    }
    if (this.physics.states.movement == PlayerPhysicsStatesValues.still) {
      this.forwardDirection.scaleXYZ(0);
    }
    if (
      this.physics.states.secondaryMovement ==
      PlayerPhysicsStatesValues.walkingRight
    ) {
      this.sideDirection.scaleXYZ(-1);
    }
    if (
      this.physics.states.secondaryMovement ==
      PlayerPhysicsStatesValues.secondaryStill
    ) {
      this.sideDirection.scaleXYZ(0);
    }
    this.node.calculateFinalDirection(
      this.forwardDirection,
      this.sideDirection
    );
    this.node.velocity.set(
      this.node.direction.x * this.getSpeed(),
      this.node.velocity.y,
      this.node.direction.z * this.getSpeed()
    );
    //set the player's velcoity based on their state
    if (
      this.physics.states.movement != PlayerPhysicsStatesValues.still ||
      this.physics.states.secondaryMovement !=
        PlayerPhysicsStatesValues.secondaryStill
    ) {
      this._lastVelocity.updateFromVec3(this.node.velocity);
      this.tweens.stop.data.max = this.physics.states.running ? 50 : 20;
      this.tweens.stop.setAlive(true);
      this.tweens.walk.update();
    }
    if (
      this.physics.states.movement == PlayerPhysicsStatesValues.still &&
      this.physics.states.secondaryMovement ==
        PlayerPhysicsStatesValues.secondaryStill
    ) {
      this.tweens.walk.setAlive(true);
      this.tweens.stop.update();
      if (!this.tweens.stop.isAlive()) {
        this.node.velocity.x = 0;
        this.node.velocity.z = 0;
      } else {
        this.node.velocity.set(
          this._lastVelocity.x,
          this.node.velocity.y,
          this._lastVelocity.z
        );
      }
    }

    if (this.states.onGround) {
      this.tweens.fall.setAlive(true);
    }
    //player jump
    if (
      this.physics.states.jumping &&
      !this.states.jumping &&
      (this.states.onGround || this.states.inWater || this.states.climbing)
    ) {
      this.states.jumping = true;
      this.node.velocity.y =
        this.states.jumpVelocity + this.stats.jumpPower / 1000;

      this.node.acceleration.y = 0;
      this.physics.states.jumping = 0;
    }

    if (this.states.jumping) {
      this.tweens.jump.update();
    }

    if ((this.states.inWater || this.states.climbing) && !this.states.jumping) {
      this.node.acceleration.y = 1;
      if (this.node.acceleration.y > 2) this.node.acceleration.y = 2;
      this.node.velocity.y = this.states.gravity;
      this.node.velocity.y -= 0.0025;
      if (this.node.velocity.y < -0.01) {
        this.node.velocity.y = -0.01;
      }
    }
    if (!this.states.onGround && !this.states.jumping && !this.states.inWater) {
      this.tweens.fall.update();
      this.node.velocity.y = this.states.gravity;
      if (!this.tweens.fall.isAlive()) this.node.acceleration.y += 0.1;
      if (this.node.acceleration.y > 3) this.node.acceleration.y = 3;
    }
  }

  getSpeed() {
    return (
      this.physics.states.running * this.runSpeed +
      //for every level of speed add a tenth of the player's base speed
      (this.speed + this.stats.speed * this.speed * 0.1)
    );
  }

  beforeUpdate() {
    this.states.inWater = false;
    this.states.climbing = false;
    for (const [x, y, z] of this.node.probe.voxels.queryWithNode(this.node)) {
      if (this.node.dataTool.loadInAt(x >> 0, y >> 0, z >> 0)) {
        if (this.node.dataTool.getSubstance() == "#dve_liquid") {
          this.states.inWater = true;
        }
        const collider = this.node.dataTool.getColliderObj();
        if (collider && collider.hasFlag(DVP.constants.flags.climbable)) {
  
          this.states.climbing = true;
        }
      }
    }


    this.controlsUpdate();

    if (this.states.cilmbingStair) {
      this.node.velocity.set(0, 1, -1.5);
      this.node.velocity.scaleXYZ(this.getSpeed());
    }


    this.states.cilmbingStair = false;
    this.states.onGround = false;
  }

  afterUpdate() {
    this.node.syncPosition(this.physics.position);

    this.physics.states.onGround =
      this.node.velocity.y == this.states.gravity && !this.states.inWater;
    this.physics.states.inWater = this.states.inWater;
  }
}

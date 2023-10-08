import { RemoteTagManager, RemoteTagManagerInitData } from "@divinestar/binary";

export const PlayerStatsTags = new RemoteTagManager("player-stats-tags");

export const PlayerStatsTagIDs = {
  header: "#header",
  level: "#level",
  exp: "#exp",
  maxMana: "#max_mana",
  currentMana: "#current_mana",
  maxEnegery: "#max_energy",
  currentEnergy: "#current_energy",
  speed: "#speed",
  jumpPower: "#jump_power",
  intuition: "#intuition",
};

export class PlayerStatsData {
  tags = new RemoteTagManager("player-stairs-data");
  constructor(sab: SharedArrayBuffer, initData: RemoteTagManagerInitData) {
    this.tags.$INIT(initData);
    this.tags.setBuffer(sab);
  }

  get level() {
    return this.tags.getTag(PlayerStatsTagIDs.level);
  }
  set level(level: number) {
    this.tags.setTag(PlayerStatsTagIDs.level, level);
  }

  get exp() {
    return this.tags.getTag(PlayerStatsTagIDs.exp);
  }
  set exp(exp: number) {
    this.tags.setTag(PlayerStatsTagIDs.exp, exp);
  }

  get maxMana() {
    return this.tags.getTag(PlayerStatsTagIDs.maxMana);
  }
  set maxMana(maxMana: number) {
    this.tags.setTag(PlayerStatsTagIDs.maxMana, maxMana);
  }

  get currentMana() {
    return this.tags.getTag(PlayerStatsTagIDs.currentMana);
  }
  set currentMana(currentMana: number) {
    this.tags.setTag(PlayerStatsTagIDs.currentMana, currentMana);
  }

  get maxEnegery() {
    return this.tags.getTag(PlayerStatsTagIDs.maxEnegery);
  }
  set maxEnegery(maxEnegery: number) {
    this.tags.setTag(PlayerStatsTagIDs.maxEnegery, maxEnegery);
  }

  get currentEnergy() {
    return this.tags.getTag(PlayerStatsTagIDs.currentEnergy);
  }
  set currentEnergy(currentEnergy: number) {
    this.tags.setTag(PlayerStatsTagIDs.currentEnergy, currentEnergy);
  }

  get speed() {
    return this.tags.getTag(PlayerStatsTagIDs.speed);
  }
  set speed(speed: number) {
    this.tags.setTag(PlayerStatsTagIDs.speed, speed);
  }

  get jumpPower() {
    return this.tags.getTag(PlayerStatsTagIDs.jumpPower);
  }
  set jumpPower(jumpPower: number) {
    this.tags.setTag(PlayerStatsTagIDs.jumpPower, jumpPower);
  }

  get intuition() {
    return this.tags.getTag(PlayerStatsTagIDs.intuition);
  }
  set intuition(intuition: number) {
    this.tags.setTag(PlayerStatsTagIDs.intuition, intuition);
  }
}

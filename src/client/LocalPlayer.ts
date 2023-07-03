import { InventorySlot, Skill } from "~/constants";
import { areEqual as arraysAreEqual } from "~/utils/array";
import Player from "./Player";
import Position from "./Position";

export default class LocalPlayer extends Player {
  private _premium = false;

  private _known = false;

  private _pending = false;

  private _spells: Array<number> = [];

  private _skillsLevel = new Array<number>(Skill.LastSkill);

  private _skillsBaseLevel = new Array<number>(Skill.LastSkill);

  private _skillsLevelPercent = new Array<number>(Skill.LastSkill);

  private _states = 0;

  private _vocation = 0;

  private _blessings = 0;

  private _health: double = 0;

  private _maxHealth: double = 0;

  private _freeCapacity: double = 0;

  private _totalCapacity: double = 0;

  private _experience: double = 0;

  private _level: double = 0;

  private _levelPercent: double = 0;

  private _mana: double = 0;

  private _maxMana: double = 0;

  private _magicLevel: double = 0;

  private _magicLevelPercent: double = 0;

  private _baseMagicLevel: double = 0;

  private _soul: double = 0;

  private _stamina: double = 0;

  private _regenerationTime: double = 0;

  private _offlineTrainingTime: double = 0;

  isLocalPlayer() {
    return true;
  }

  onPositionChange(newPos: Position, oldPos: Position) {
    super.onPositionChange(newPos, oldPos);
  }

  setStates(states: number) {
    if (states === this._states) {
      return;
    }

    this._states = states;
  }

  setSkill(skill: Skill, level: number, levelPercent: number) {
    if (skill >= Skill.LastSkill) {
      console.log(`Invalid skill: ${skill}`);
      return;
    }

    const oldLevel = this._skillsLevel[skill];
    const oldLevelPercent = this._skillsLevelPercent[skill];

    if (level === oldLevel && levelPercent === oldLevelPercent) {
      return;
    }

    this._skillsLevel[skill] = level;
    this._skillsLevelPercent[skill] = levelPercent;
  }

  setBaseSkill(skill: Skill, baseLevel: number) {
    if (skill >= Skill.LastSkill) {
      console.log(`Invalid skill: ${skill}`);
      return;
    }

    if (baseLevel === this._skillsBaseLevel[skill]) {
      return;
    }

    this._skillsBaseLevel[skill] = baseLevel;
  }

  setHealth(health: double, maxHealth: double): void {
    if (health === this._health && maxHealth === this._maxHealth) {
      return;
    }

    this._health = health;
    this._maxHealth = maxHealth;
  }

  setFreeCapacity(freeCapacity: double) {
    if (freeCapacity === this._freeCapacity) {
      return;
    }

    this._freeCapacity = freeCapacity;
  }

  setTotalCapacity(totalCapacity: double) {
    if (totalCapacity === this._totalCapacity) {
      return;
    }

    this._totalCapacity = totalCapacity;
  }

  setExperience(experience: double) {
    if (experience === this._experience) {
      return;
    }

    this._experience = experience;
  }

  setLevel(level: double, levelPercent: double) {
    if (level === this._level && levelPercent === this._levelPercent) {
      return;
    }

    this._level = level;
    this._levelPercent = levelPercent;
  }

  setMana(mana: double, maxMana: double) {
    if (mana === this._mana && maxMana === this._maxMana) {
      return;
    }

    this._mana = mana;
    this._maxMana = maxMana;
  }

  setMagicLevel(magicLevel: double, magicLevelPercent: double) {
    if (magicLevel === this._magicLevel && magicLevelPercent === this._magicLevelPercent) {
      return;
    }

    this._magicLevel = magicLevel;
    this._magicLevelPercent = magicLevelPercent;
  }

  setBaseMagicLevel(baseMagicLevel: double) {
    if (baseMagicLevel === this._baseMagicLevel) {
      return;
    }

    this._baseMagicLevel = baseMagicLevel;
  }

  // copilot, implements setSoul and setStamina
  setSoul(soul: double) {
    if (soul === this._soul) {
      return;
    }

    this._soul = soul;
  }

  setStamina(stamina: double) {
    if (stamina === this._stamina) {
      return;
    }

    this._stamina = stamina;
  }

  setKnown(known: boolean) {
    this._known = known;
  }

  setPendingGame(pending: boolean) {
    this._pending = pending;
  }

  setInventoryItem(inventory: InventorySlot /* , item: Item */) {}

  setVocation(vocation: number) {
    if (vocation === this._vocation) {
      return;
    }

    this._vocation = vocation;
  }

  setPremium(premium: boolean) {
    if (premium === this._premium) {
      return;
    }

    this._premium = premium;
  }

  setRegenerationTime(regenerationTime: double) {
    if (regenerationTime === this._regenerationTime) {
      return;
    }

    this._regenerationTime = regenerationTime;
  }

  setOfflineTrainingTime(offlineTrainingTime: double) {
    if (offlineTrainingTime === this._offlineTrainingTime) {
      return;
    }

    this._offlineTrainingTime = offlineTrainingTime;
  }

  setSpells(spells: number[]) {
    if (arraysAreEqual<number>(spells, this._spells)) {
      return;
    }

    this._spells = spells;
  }

  setBlessings(blessings: number) {
    if (blessings === this._blessings) {
      return;
    }

    this._blessings = blessings;
  }

  getStates() {
    return this._states;
  }

  getSkillLevel(skill: Skill) {
    return this._skillsLevel[skill];
  }

  getSkillBaseLevel(skill: Skill) {
    return this._skillsBaseLevel[skill];
  }

  getSkillLevelPercent(skill: Skill) {
    return this._skillsLevelPercent[skill];
  }

  getVocation() {
    return this._vocation;
  }

  getHealth() {
    return this._health;
  }

  getMaxHealth() {
    return this._maxHealth;
  }

  getFreeCapacity() {
    return this._freeCapacity;
  }

  getTotalCapacity() {
    return this._totalCapacity;
  }

  getExperience() {
    return this._experience;
  }

  getLevel() {
    return this._level;
  }

  getLevelPercent() {
    return this._levelPercent;
  }

  getMana() {
    return this._mana;
  }

  getMaxMana() {
    return this._maxMana;
  }

  getMagicLevel() {
    return this._magicLevel;
  }

  getMagicLevelPercent() {
    return this._magicLevelPercent;
  }

  getBaseMagicLevel() {
    return this._baseMagicLevel;
  }

  getSoul() {
    return this._soul;
  }

  getStamina() {
    return this._stamina;
  }

  getRegenerationTime() {
    return this._regenerationTime;
  }

  getOfflineTrainingTime() {
    return this._offlineTrainingTime;
  }

  getSpells() {
    return this._spells;
  }

  // getInventoryItem(Otc::InventorySlot inventory) { return m_inventoryItems[inventory]; }

  getBlessings() {
    return this._blessings;
  }
}

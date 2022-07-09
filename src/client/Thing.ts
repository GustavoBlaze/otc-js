import Position from "./Position";

export default class Thing {
  protected _position = new Position();

  protected _datId = 0;

  isItem() {
    return false;
  }

  isEffect() {
    return false;
  }

  isMissile() {
    return false;
  }

  isCreature() {
    return false;
  }

  isNpc() {
    return false;
  }

  isMonster() {
    return false;
  }

  isPlayer() {
    return false;
  }

  isLocalPlayer() {
    return false;
  }

  isAnimatedText() {
    return false;
  }

  isStaticText() {
    return false;
  }
}

import Creature from "./Creature";

export default class Player extends Creature {
  isPlayer() {
    return true;
  }
}

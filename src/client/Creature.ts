import { Direction } from "~/constants";
import Position from "./Position";
import Thing from "./Thing";

const SHIELD_BLINK_TICKS = 500;
const VOLATILE_SQUARE_DURATION = 1000;

export default class Creature extends Thing {
  protected _id = 0;

  protected _name = "";

  protected _healthPercent = 0;

  protected _direction = Direction.South;

  // protected _outfit
  protected _light?: Light;

  protected _speed = 0;

  protected _baseSpeed = 0;

  protected _skull = 0;

  protected _shield = 0;

  protected _emblem = 0;

  protected _type = 0;

  protected _icon = 0;

  // protected _skullTexture?: Texture;
  // protected _shieldTexture?: Texture;
  // protected _emblemTexture?: Texture;
  // protected _typeTexture?: Texture;
  // protected _iconTexture?: Texture;

  protected _showShieldTexture = true;

  protected _shieldBlink = false;

  protected _passable = false;

  protected _timedSquareColor = 0;

  protected _staticSquareColor = 0;

  protected _showTimedSquare = false;

  protected _showStaticSquare = false;

  protected _removed = true;

  // protected _nameCache = "";
  protected _informationColor = 0;

  protected _outfitColor = 0;
  // protected _outfitColorUpdateEvent?: ScheduledEvent;
  // protected _outfitColorTimer?: Timer;

  // walk related
  protected _walkAnimationPhase = 0;

  protected _walkedPixels = 0;

  protected _footStep = 0;

  protected _walkTimer = 0;

  protected _footTimer = 0;

  // protected _walkingTile: Tile;

  protected _walking = false;

  protected _allowAppearWalk = false;

  protected _footStepDrawn = false;

  // protected _walkUpdateEvent;
  // protected _walkFinishAnimEvent;
  // protected _disappearEvent;

  protected _walkOffset: Point = { x: 0, y: 0 };

  protected _walkTurnDirection: Direction = 0;

  protected _lastStepDirection: Direction = 0;

  protected _lastStepFromPosition = new Position();

  protected _lastStepToPosition = new Position();

  protected _oldPosition = new Position();

  isNpc() {
    return false;
  }

  isMonster() {
    return false;
  }
}

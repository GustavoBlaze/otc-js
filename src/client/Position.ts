import { Direction, MAX_Z } from "~/constants";

const RAD_TO_DEC = 180 / Math.PI;

export default class Position {
  public x: number;

  public y: number;

  public z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = x ?? 65535;
    this.y = y ?? 65535;
    this.z = z ?? 255;
  }

  static fromOtherPosition(position: Position): Position {
    return new Position(position.x, position.y, position.z);
  }

  translatedToReverseDirection(direction: Direction): Position {
    const pos = Position.fromOtherPosition(this);

    switch (direction) {
      case Direction.North:
        pos.y++;
        break;
      case Direction.East:
        pos.x--;
        break;
      case Direction.South:
        pos.y--;
        break;
      case Direction.West:
        pos.x++;
        break;
      case Direction.NorthEast:
        pos.x--;
        pos.y++;
        break;
      case Direction.SouthEast:
        pos.x--;
        pos.y--;
        break;
      case Direction.SouthWest:
        pos.x++;
        pos.y--;
        break;
      case Direction.NorthWest:
        pos.x++;
        pos.y++;
        break;
      default:
        break;
    }

    return pos;
  }

  translatedToDirections(directions: Direction[]): Position[] {
    const positions: Position[] = [];
    let lastPos = Position.fromOtherPosition(this);

    if (!lastPos.isValid()) {
      return positions;
    }

    positions.push(lastPos);

    for (const direction of directions) {
      lastPos = lastPos.translatedToReverseDirection(direction);
      if (!lastPos.isValid()) {
        return positions;
      }
      positions.push(lastPos);
    }

    return positions;
  }

  static getAngleFromPosition(from: Position, to: Position) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (dx == 0 && dy == 0) {
      return -1;
    }

    let angle = Math.atan2(dy, dx);

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    return angle;
  }

  getAngleFromPosition(to: Position) {
    return Position.getAngleFromPosition(this, to);
  }

  static getDirectionFromPositions(from: Position, to: Position) {
    const angle = Position.getAngleFromPosition(from, to) * RAD_TO_DEC;

    if (angle >= 360 - 22.5 || angle < 0 + 22.5) {
      return Direction.East;
    }
    if (angle >= 45 - 22.5 && angle < 45 + 22.5) {
      return Direction.NorthEast;
    }
    if (angle >= 90 - 22.5 && angle < 90 + 22.5) {
      return Direction.North;
    }
    if (angle >= 135 - 22.5 && angle < 135 + 22.5) {
      return Direction.NorthWest;
    }
    if (angle >= 180 - 22.5 && angle < 180 + 22.5) {
      return Direction.West;
    }
    if (angle >= 225 - 22.5 && angle < 225 + 22.5) {
      return Direction.SouthWest;
    }
    if (angle >= 270 - 22.5 && angle < 270 + 22.5) {
      return Direction.South;
    }
    if (angle >= 315 - 22.5 && angle < 315 + 22.5) {
      return Direction.SouthEast;
    }

    return Direction.InvalidDirection;
  }

  getDirectionFromPosition(position: Position) {
    return Position.getDirectionFromPositions(this, position);
  }

  isMapPosition() {
    return this.x >= 0 && this.y >= 0 && this.z >= 0 && this.x < 65535 && this.y < 65535 && this.z <= MAX_Z;
  }

  isValid() {
    return !(this.x == 65535 && this.y == 65535 && this.z == 255);
  }

  distance(pos: Position) {
    return Math.sqrt((this.x - pos.x) ** 2 + (this.y - pos.y) ** 2);
  }

  manhattanDistance(pos: Position) {
    return Math.abs(pos.x - this.x) + Math.abs(pos.y - this.y);
  }

  translate(dx: number, dy: number, dz: number) {
    this.x += dx;
    this.y += dy;
    this.z += dz;
  }

  translated(dx: number, dy: number, dz: number) {
    this.translate(dx, dy, dz);
    return this;
  }

  static mathSum(from: Position, other: Position) {
    return new Position(from.x + other.x, from.y + other.y, from.z + other.z);
  }

  static mathDifference(from: Position, other: Position) {
    return new Position(from.x - other.x, from.y - other.y, from.z - other.z);
  }

  mathIncrement(other: Position) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
  }

  mathDecrement(other: Position) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
  }

  isEqual(other: Position) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  isNotEqual(other: Position) {
    return !this.isEqual(other);
  }

  isInRange(pos: Position, rangeX: number, rangeY: number) {
    return Math.abs(this.x - pos.x) <= rangeX && Math.abs(this.y - pos.y) <= rangeY && this.z === pos.z;
  }

  isBetweenRange(pos: Position, minRangeX: number, minRangeY: number, maxRangeX: number, maxRangeY: number) {
    return (
      Math.abs(this.x - pos.x) >= minRangeX &&
      Math.abs(this.y - pos.y) >= minRangeY &&
      Math.abs(this.x - pos.x) <= maxRangeX &&
      Math.abs(this.y - pos.y) <= maxRangeY &&
      this.z == pos.z
    );
  }

  isLessThan(other: Position) {
    return this.x < other.x || this.y < other.y || this.z < other.z;
  }

  up(n = 1) {
    const nz = this.z - n;
    if (nz >= 0 && nz <= MAX_Z) {
      this.z = nz;
      return true;
    }
    return false;
  }

  down(n = 1) {
    const nz = this.z + n;
    if (nz >= 0 && nz <= MAX_Z) {
      this.z = nz;
      return true;
    }
    return false;
  }

  coveredUp(n = 1) {
    const nx = this.x + n;
    const ny = this.y + n;
    const nz = this.z - n;
    if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= MAX_Z) {
      this.x = nx;
      this.y = ny;
      this.z = nz;
      return true;
    }
    return false;
  }

  coveredDown(n = 1) {
    const nx = this.x - n;
    const ny = this.y - n;
    const nz = this.z + n;
    if (nx >= 0 && nx <= 65535 && ny >= 0 && ny <= 65535 && nz >= 0 && nz <= MAX_Z) {
      this.x = nx;
      this.y = ny;
      this.z = nz;
      return true;
    }
    return false;
  }
}

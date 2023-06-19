import { assert } from "console";
import { AnimationDirection } from "~/constants";
import { FileStream } from "~/core";

export default class Animator {
  private _animationPhases = 0;

  private _startPhase = 0;

  private _loopCount = 0;

  private _async = false;

  private _phaseDurations: Array<Number[]> = [];

  private _currentDuration = 0;

  private _currentDirection: AnimationDirection = AnimationDirection.Forward;

  private _currentLoop = 0;

  private _lastPhaseTicks = 0;

  private _isComplete = false;

  private _phase = 0;

  getStartPhase(): number {
    if (this._startPhase > -1) return this._startPhase;

    return Math.floor(Math.random() * this._animationPhases);
  }

  unserialize(animationPhases: number, fileStream: FileStream) {
    this._animationPhases = animationPhases;
    this._async = fileStream.getU8() === 0;
    this._loopCount = fileStream.get32();
    this._startPhase = fileStream.get8();

    for (let i = 0; i < animationPhases; i++) {
      const min = fileStream.getU32();
      const max = fileStream.getU32();
      this._phaseDurations.push([min, max]);
    }

    this._phase = this.getStartPhase();

    assert(this._animationPhases === this._phaseDurations.length);
    assert(this._startPhase >= -1 && this._startPhase < this._animationPhases);
  }
}

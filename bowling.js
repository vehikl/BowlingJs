//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

import {FrameGenerator} from "./frame-generator";

export class Bowling {
  constructor() {
    this._rolls = [];
    this._currentFrameRolls = [];
  }

  roll(roll) {
    if (roll < 0) {
      throw new Error('Negative roll is invalid');
    }

    if (roll > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }


    this._checkTenthFrameRules();

    this._currentFrameRolls.push(roll);
    if ((this._currentFrameRolls.reduce((score, roll) => score + roll, 0)) > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    this._rolls.push(roll);

    if (roll === 10 || this._currentFrameRolls.length === 2) {
      this._currentFrameRolls = []
    }
  }

  score() {
    const frames = this._generateFrames(this._rolls)
    if (frames.length < 10) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    const lastFrame = frames[frames.length - 1];
    if (lastFrame[0] === 10) {
      if (!lastFrame[1]){
        throw new Error('Score cannot be taken until the end of the game');
      }

      if (lastFrame[1] === 10 && !lastFrame[2]) {
        throw new Error('Score cannot be taken until the end of the game');
      }
    }

    let score = 0;
    let frameIndex = 0;

    for (let i = 0; i < 10; i++) {
      if (this._rolls[frameIndex] === 10) {
        score += this._rolls[frameIndex];
        score += this._rolls[frameIndex + 1];
        score += this._rolls[frameIndex + 2];
        frameIndex += 1;
        continue;
      }

      if ((this._rolls[frameIndex] + this._rolls[frameIndex + 1]) === 10) {
        score += this._rolls[frameIndex];
        score += this._rolls[frameIndex + 1];
        score += this._rolls[frameIndex + 2];
        frameIndex += 2;
        continue;
      }

      score += this._rolls[frameIndex];
      score += this._rolls[frameIndex + 1];
      frameIndex += 2;
    }

    return score;
  }

  _generateFrames(rolls) {
    return (new FrameGenerator()).get(rolls);
  }

  _checkTenthFrameRules() {
    const frames = this._generateFrames(this._rolls);
    if (frames.length === 10) {
      const finalFrame = frames[frames.length - 1];
      if (finalFrame[0] === 10 && finalFrame.length === 2) {
        return
      }
      if (finalFrame[0] + finalFrame[1] === 10 && finalFrame.length === 2) {
        return
      }

      if (finalFrame.length === 2) {
        throw new Error('Cannot roll after game is over');
      }
    }
  }
}

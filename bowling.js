//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  constructor() {
    this._rolls = [];
  }

  roll(roll) {
    this._rolls.push(roll);
  }

  score() {
    let score = 0;
    let frameIndex = 0;

    while (frameIndex < this._rolls.length) {
      score += this._rolls[frameIndex];
      score += this._rolls[frameIndex + 1];
      frameIndex += 2;
    }

    return score;
  }
}

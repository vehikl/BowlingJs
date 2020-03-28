//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  constructor() {
    this._rolls = [];
  }

  roll(roll) {
    if (roll < 0) {
      throw new Error('Negative roll is invalid');
    }
    this._rolls.push(roll);
  }

  score() {
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
}

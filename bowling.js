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

    for (let i = 0; i < this._rolls.length; i++) {
      const roll = this._rolls[i];

      score += roll;
    }

    return score;
  }
}

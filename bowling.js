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
    return this._rolls.reduce((score, roll) => score + roll, 0);
  }
}

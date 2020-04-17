//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  constructor() {
    this.rolls = 0;
  }

  roll(num) {
    this.rolls += num;
  }

  score() {
    return this.rolls;
  }
}

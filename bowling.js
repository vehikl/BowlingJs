//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {

  constructor() {
    this.rolls = [];
  }

  roll(num) {
    this.rolls.push(num);
  }

  score() {
    return this.rolls.reduce((acc, v) => acc+v, 0);
  }
}

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
    var final = 0;
    var rollCounter = 0;
    for(var i =0; i< 10; i++) {
      const frame = this.rolls[0] === 10 ? this.rolls.splice(0,1) : this.rolls.splice(0,2);
      let frameScore = frame.reduce((accumulator, value) => accumulator + value, 0);

      if(frameScore === 10 && frame.length === 1) {
        frameScore += this.rolls[0];
        frameScore += this.rolls[1];
      } else if (frameScore === 10 && frame.length === 2) {
        frameScore += this.rolls[0];
      }

      final += frameScore;
    }

    return final;
  }
}

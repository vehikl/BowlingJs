//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {

  constructor() {
    this.rolls = [];
  }

  roll(num) {
    if (num < 0) {
      throw new Error('Negative roll is invalid');
    }

    if (num > 10 ) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    console.log(this.toFrames());

    this.rolls.push(num);
  }

  score() {
    let final = 0;
    for(let i =0; i< 10; i++) {
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

  toFrames() {
    let final = [];
    let rolls = [...this.rolls];
    for (let i =0; i< 10; i++) {
      if (i !== 10) {
        const frame = rolls[0] === 10 ? rolls.splice(0,1) : rolls.splice(0,2);
        final.push(frame);
        continue;
      }

      final.push(rolls);
    }

    return final;
  }
}

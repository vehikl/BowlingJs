//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {

  constructor() {
    this.rolls = [];
  }

  isStrike(frame) {
    if(!frame || frame.length === 0) return false;
    return frame[0] === 10;
  }

  isSpare(frame) {
    if(!frame || frame.length !== 2) return false;
    return frame[0] + frame[1] === 10;
  }

  getLastFrame() {
    const frames = this.toFrames();
    return frames[frames.length - 1];
  }

  isLastFrameComplete(frame) {
    if(this.isStrike(frame)) {
      return frame.length === 3;
    }

    if(this.isSpare(frame)) {
      return frame.length === 3;
    }

    return frame.length === 2;
  }

  roll(num) {
    if (num < 0) {
      throw new Error('Negative roll is invalid');
    }

    if (num > 10 ) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    const frames = this.toFrames();
    const lastFrame = frames[frames.length - 1];

    if (frames.length === 10 && lastFrame.length === 3) {
      throw new Error('Cannot roll after game is over');
    }

    if(frames.length === 10 && lastFrame.length == 2 && !this.isSpare(lastFrame) && !this.isStrike(lastFrame)) {
        throw new Error('Cannot roll after game is over');
    }

    if (frames && frames.length === 10) {
      if (lastFrame[0] === 10) {
        if (lastFrame.length === 2) {
          if (lastFrame[1] !== 10 && lastFrame[1] + num > 10) {
            throw new Error('Pin count exceeds pins on the lane');
          }
        }
      }
    }

    if(lastFrame && lastFrame.length === 1 && lastFrame[0] !== 10) {
      if(lastFrame[0] + num > 10) {
        throw new Error('Pin count exceeds pins on the lane');
      }
    }

    this.rolls.push(num);
  }

  score() {
    const lastFrame = this.getLastFrame();
    if(this.toFrames().length === 10 && this.isStrike(lastFrame) || this.isSpare(lastFrame)) {
      if(lastFrame.length < 3) {
        throw new Error('Score cannot be taken until the end of the game');
      }
    }

    if(this.toFrames().length !== 10) {
      throw new Error('Score cannot be taken until the end of the game');
    }

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
      if (i !== 9) {
        const frame = rolls[0] === 10 ? rolls.splice(0,1) : rolls.splice(0,2);
        final.push(frame);
        continue;
      }

      final.push(rolls);
    }

    return final.filter(v => v.length !== 0);
  }
}

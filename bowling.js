class InvalidPinCountError extends Error { constructor() { super('Pin count exceeds pins on the lane'); } }
class GameOverError extends Error { constructor() { super('Cannot roll after game is over'); } }
class ScoreBeforeGameEndError extends Error { constructor() { super('Score cannot be taken until the end of the game'); } }
class NegativeRollError extends Error { constructor() { super('Negative roll is invalid'); } }

export class Bowling {
  constructor() {
    this.rolls = [];
  }

  isStrike(frame) {
    return (!frame || frame.length === 0) ? false : frame[0] === 10;
  }

  isSpare(frame) {
    return (!frame || frame.length !== 2) ? false : frame[0] + frame[1] === 10;
  }

  isOnLastFrame() {
    return this.toFrames() && this.toFrames().length === 10;
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

  assertBonusRollsValid(num) {
    const lastFrame = this.getLastFrame();
    if (!lastFrame) return;

    const firstRollIsStrike = lastFrame[0] === 10;
    const frameHasTwoRolls = lastFrame.length === 2;
    const secondRollNotStrike = lastFrame[1] !== 10;
    const lastTwoRollsGreaterThanTen = lastFrame[1] + num > 10;

    if (this.isOnLastFrame() && firstRollIsStrike && frameHasTwoRolls && secondRollNotStrike && lastTwoRollsGreaterThanTen) {
        throw new InvalidPinCountError();
    }
  }

  assertFrameValid(num) {
    const lastFrame = this.getLastFrame();
    if (!lastFrame) return;

    const firstRollNotStrike = lastFrame[0] !== 10;
    const hasOnlyOneRoll = lastFrame.length === 1;
    const lastTwoRollsGreaterThanTen = (lastFrame[0] + num) > 10;

    if(hasOnlyOneRoll && firstRollNotStrike && lastTwoRollsGreaterThanTen) {
      throw new InvalidPinCountError();
    }
  }

  assertGameNotOver() {
    const frames = this.toFrames();
    const lastFrame = frames[frames.length - 1];

    if (this.isOnLastFrame() && lastFrame.length === 3) {
      throw new GameOverError();
    }

    if(this.isOnLastFrame() && lastFrame.length == 2 && !this.isSpare(lastFrame) && !this.isStrike(lastFrame)) {
      throw new GameOverError();
    }
  }

  assertRollValid(num) {
    if (num < 0) throw new NegativeRollError();
    if (num > 10) throw new InvalidPinCountError();
  }

  validateRoll(num) {
    this.assertRollValid(num);
    this.assertGameNotOver();
    this.assertFrameValid(num);
    this.assertBonusRollsValid(num);
  }

  assertTenFrames() {
    if(this.toFrames().length !== 10) {
      throw new ScoreBeforeGameEndError();
    }
  }

  assertLastFrameComplete() {
    const lastFrame = this.getLastFrame();
    if(this.isOnLastFrame() && this.isStrike(lastFrame) || this.isSpare(lastFrame)) {
      if(lastFrame.length < 3) {
        throw new ScoreBeforeGameEndError();
      }
    }
  }

  validateScore() {
    this.assertTenFrames();
    this.assertLastFrameComplete();
  }

  addRoll(num) {
    this.rolls.push(num);
  }

  roll(num) {
    this.validateRoll(num);
    this.addRoll(num);
  }

  scoreFrame() {
    const frame = this.rolls[0] === 10 ? this.rolls.splice(0,1) : this.rolls.splice(0,2);
    let frameScore = frame.reduce((accumulator, value) => accumulator + value, 0);

    if (frameScore === 10 && frame.length === 1) {
      frameScore += this.rolls[0];
      frameScore += this.rolls[1];
    } else if (frameScore === 10 && frame.length === 2) {
      frameScore += this.rolls[0];
    }

    return frameScore;
  }

  score() {
    this.validateScore();

    let finalScore = 0;
    for (let i=0; i<10; i++) {
      finalScore += this.scoreFrame();
    }

    return finalScore;
  }

  toFrames() {
    let final = [];
    let rolls = [...this.rolls];
    for (let i =0; i < 10; i++) {
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

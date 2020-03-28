import { Bowling } from './bowling';
import { FrameGenerator } from './frame-generator';

describe('Bowling', () => {
  describe('Check game can be scored correctly.', () => {
    test('should be able to score a game with all zeros', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(0);
    });

    test('should be able to score a game with no strikes or spares', () => {
      const rolls = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(90);
    });

    test('a spare followed by zeros is worth ten points', () => {
      const rolls = [6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(10);
    });

    test('points scored in the roll after a spare are counted twice', () => {
      const rolls = [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(16);
    });

    test('consecutive spares each get a one roll bonus', () => {
      const rolls = [5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(31);
    });

    test('a spare in the last frame gets a one roll bonus that is counted once', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(17);
    });

    test('a strike earns ten points in a frame with a single roll', () => {
      const rolls = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(10);
    });

    test('points scored in the two rolls after a strike are counted twice as a bonus', () => {
      const rolls = [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(26);
    });

    test('consecutive strikes each get the two roll bonus', () => {
      const rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(81);
    });

    test('a strike in the last frame gets a two roll bonues that is counted once', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(18);
    });

    test('rolling a spare with the two roll bonus does not get a bonus roll', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(20);
    });

    test('strikes with the two roll bonus do not get bonus rolls', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(30);
    });

    test('a strike with the one roll bonus after a spare in the last frame does not get a bonus', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(20);
    });

    test('all strikes is a perfect game', () => {
      const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(300);
    });
  });

  describe('Check game rules.', () => {
    test('rolls can not score negative points', () => {
      const bowling = new Bowling();
      expect(() => { bowling.roll(-1); })
        .toThrow(new Error('Negative roll is invalid'));
    });

    test('a roll can not score more than 10 points', () => {
      const bowling = new Bowling();
      expect(() => { bowling.roll(11); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('two rolls in a frame can not score more than 10 points', () => {
      const bowling = new Bowling();
      bowling.roll(5);
      expect(() => { bowling.roll(6); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('bonus roll after a strike in the last frame cannot score more than 10 points', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(11); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('two bonus rolls after a strike in the last frame can not score more than 10 points', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(6); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 6];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(bowling.score()).toEqual(26);
    });

    test('the second bonus rolls after a strike in the last frame can not be a strike if the first one is not a strike', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 6];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(10); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('second bonus roll after a strike in the last frame cannot score more than 10 points', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(11); })
        .toThrow(new Error('Pin count exceeds pins on the lane'));
    });

    test('an unstarted game can not be scored', () => {
      const bowling = new Bowling();
      expect(() => { bowling.score(); })
        .toThrow(new Error('Score cannot be taken until the end of the game'));
    });

    test('an incomplete game can not be scored', () => {
      const rolls = [0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.score(); })
        .toThrow(new Error('Score cannot be taken until the end of the game'));
    });

    test('cannot roll if game already has ten frames', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(0); })
        .toThrow(new Error('Cannot roll after game is over'));
    });

    xtest('bonus rolls for a strike in the last frame must be rolled before score can be calculated', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.score(); })
        .toThrow(new Error('Score cannot be taken until the end of the game'));
    });

    xtest('both bonus rolls for a strike in the last frame must be rolled before score can be calculated', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.score(); })
        .toThrow(new Error('Score cannot be taken until the end of the game'));
    });

    xtest('bonus roll for a spare in the last frame must be rolled before score can be calculated', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.score(); })
        .toThrow(new Error('Score cannot be taken until the end of the game'));
    });

    xtest(' cannot roll after bonus roll for spare', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 2];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(2); })
        .toThrow(new Error('Cannot roll after game is over'));
    });

    xtest('cannot roll after bonus rolls for strike', () => {
      const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 2];
      const bowling = new Bowling();
      rolls.forEach((roll) => { bowling.roll(roll); });
      expect(() => { bowling.roll(2); })
        .toThrow(new Error('Cannot roll after game is over'));
    });
  });
});

describe('FrameGenerator', () => {
  it('generates normal game', () => {
    const roles = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
    const frames = (new FrameGenerator).get(roles);

    expect(frames).toStrictEqual([
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
    ])
  });

  it('generates spare bonus game', () => {
    const roles = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 7, 1];
    const frames = (new FrameGenerator).get(roles);

    expect(frames).toStrictEqual([
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,7,1],
    ])
  });

  it('generates strike bonus game', () => {
    const roles = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 10, 10, 10];
    const frames = (new FrameGenerator).get(roles);

    expect(frames).toStrictEqual([
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [3,6],
      [10,10,10],
    ])
  });



  it('generates perfect game frame', () => {
    const roles = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const frames = (new FrameGenerator).get(roles);

    expect(frames).toStrictEqual([
      [10],
      [10],
      [10],
      [10],
      [10],
      [10],
      [10],
      [10],
      [10],
      [10,10,10],
    ])
  });
});

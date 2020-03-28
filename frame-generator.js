export class FrameGenerator {
  get(rolls) {
    return rolls.reduce((frames, roll) => {
      if (frames.length < 10) {
        // strikes are alone in a frame
        if (roll === 10) {
          if (!frames[0].length) {
            frames.pop();
          }
          frames.push([10]);
          return frames;
        }

        let previousFrame = frames.pop();

        // if the previous frame has room, add roll to it
        if (previousFrame.length < 2) {
          previousFrame.push(roll);
          frames.push(previousFrame);
          return frames;
        }

        // put previous frame back
        frames.push(previousFrame);

        // generate a new frame
        frames.push([roll]);
        return frames;
      }

      let previousFrame = frames.pop();
      previousFrame.push(roll);
      frames.push(previousFrame);
      return frames;

    }, [[]]);
  }
}

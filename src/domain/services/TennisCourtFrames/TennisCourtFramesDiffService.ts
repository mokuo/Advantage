import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";

type DiffResult = {
  deleted: TennisCourtFrame[];
  changed: TennisCourtFrame[];
  added: TennisCourtFrame[];
};

class TennisCourtFramesDiffService {
  diff(oldFrames: TennisCourtFrame[], newFrames: TennisCourtFrame[]): DiffResult {
    const changed: TennisCourtFrame[] = [];
    const added: TennisCourtFrame[] = [];

    newFrames.forEach((newFrame) => {
      const oldFrameIndex = oldFrames.findIndex((oldFrame) => oldFrame.isSameFrame(newFrame));
      if (oldFrameIndex === -1) {
        added.push(newFrame);
        return;
      }

      const changedFrame = oldFrames[oldFrameIndex];
      changedFrame.setStatus(newFrame.status);
      changed.push(changedFrame);
      oldFrames.splice(oldFrameIndex, 1);
    });

    return {
      deleted: oldFrames,
      changed,
      added,
    };
  }
}

export default TennisCourtFramesDiffService;

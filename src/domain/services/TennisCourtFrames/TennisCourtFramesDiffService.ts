import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";

type DiffResult = {
  deleted: TennisCourtFrame[];
  changed: TennisCourtFrame[];
  added: TennisCourtFrame[];
};

class TennisCourtFramesDiffService {
  diff(oldFrames: TennisCourtFrame[], newFrames: TennisCourtFrame[]): DiffResult {
    const oldFramesToDelete = [...oldFrames];
    const changed: TennisCourtFrame[] = [];
    const added: TennisCourtFrame[] = [];

    newFrames.forEach((newFrame) => {
      const oldFrameIndex = oldFramesToDelete.findIndex((oldFrame) => oldFrame.isSameFrame(newFrame));
      // 前回取得した TennisCourtFrame に存在しなければ added
      if (oldFrameIndex === -1) {
        added.push(newFrame);
        return;
      }

      // ステータスが変わっていなければ何もしない
      const oldFrame = oldFramesToDelete[oldFrameIndex];
      if (oldFrame.status.isEqual(newFrame.status)) {
        oldFramesToDelete.splice(oldFrameIndex, 1);
        return;
      }

      // ステータスが変わっていれば changed
      oldFrame.setStatus(newFrame.status);
      changed.push(oldFrame);
      oldFramesToDelete.splice(oldFrameIndex, 1);
    });

    return {
      deleted: oldFramesToDelete, // splice されなかったものを deleted とする
      changed,
      added,
    };
  }
}

export default TennisCourtFramesDiffService;

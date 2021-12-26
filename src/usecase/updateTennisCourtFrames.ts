import ITennisCourtFrameRepository from "@src/domain/models/TennisCourtFrames/ITennisCourtFrameRepository";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

const updateTennisCourtFrames = async (repo: ITennisCourtFrameRepository = new TennisCourtFrameRepository()) => {
  const tennisCourtFrames = await repo.all() // eslint-disable-line @typescript-eslint/no-unused-vars

  // HACK: とりあえず eslint エラーを消しただけ
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  FirestoreDatabase.runTransaction(async (t) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // TODO: TennisCoutFrame を更新する
    // TODO: 新たに空きが出ていれば通知する
  })
};

export default updateTennisCourtFrames;

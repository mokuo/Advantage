import express from "express";
import asyncHandler from "express-async-handler";
import getEnvValue from "@src/lib/getEnvValue";
import UpdateTennisCourtFramesUsecase from "@src/usecase/UpdateTennisCourtFramesUsecase";

const app = express();
const port = getEnvValue("PORT");

app.post(
  "/tennis-court-frames",
  asyncHandler(async (_, res) => {
    const usecase = new UpdateTennisCourtFramesUsecase();
    await usecase.update();
    res.status(201).send();
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

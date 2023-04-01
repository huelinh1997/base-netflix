import {
  findVideoIdByUser,
  updateUserHistory,
  createUserHistory,
} from "@/lib/db/hasura";
import jwt from "jsonwebtoken";
import { getUserIdFromToken } from "@/lib/util";

export default async function userHistory(req, res) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(403).send({ msg: "For bidden" });
      return;
    }
    const inputParams = req.method === "POST" ? req.body : req.query;
    const { videoId } = inputParams;
    if (videoId) {
      const userId = await getUserIdFromToken(token);
      const findVideo = await findVideoIdByUser(token, userId, videoId);
      const isVideoExist = findVideo?.length > 0;
      if (req.method === "POST") {
        const { favourited = null, watched = true } = req.body;
        if (isVideoExist) {
          // update
          const response = await updateUserHistory(token, {
            userId,
            videoId,
            favourited,
            watched,
          });
          res.send({
            data: response.data.update_user_history.returning,
          });
        } else {
          // add new
          const response = await createUserHistory(token, {
            userId,
            videoId,
            favourited,
            watched,
          });
          res.send({ msg: "Create new history success", response });
        }
        return;
      }

      if (req.method === "GET") {
        res.send(findVideo);
        return;
      }
      res.status(400).send({ msg: "Wrong method!" });
    }
  } catch (error) {
    res.status(500).send({ done: false, error: error?.message });
  }
}

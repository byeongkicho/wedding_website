import express from "express";
import {
  getTokenAccess,
  postTokenAccess,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/guest-token").get(getTokenAccess).post(postTokenAccess);

export default userRouter;

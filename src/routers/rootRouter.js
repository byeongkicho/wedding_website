import express from "express";
import {
  home,
  getRsvp,
  postRsvp,
  password,
  about,
  contact,
  info,
  registry,
} from "../controllers/rsvpController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { protectorMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.route("/").get(home).post(password);
rootRouter.get("/logout", logout);
rootRouter.get("/about", protectorMiddleware, about);
rootRouter.get("/contact", protectorMiddleware, contact);
rootRouter.get("/info", protectorMiddleware, info);
rootRouter.get("/registry", protectorMiddleware, registry);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/rsvp").all(protectorMiddleware).get(getRsvp).post(postRsvp);

export default rootRouter;

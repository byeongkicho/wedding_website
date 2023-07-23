import { get } from "mongoose";
import rsvpModel from "../models/rsvp";
import userModel from "../models/User";

export const home = async (req, res) => {
  let days = 0;
  function countdown() {
    const targetDate = new Date("2023-09-29"); // Change this to your desired target date
    const now = new Date();
    const remainingTime = targetDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    days = Math.floor(remainingTime / day);
  }
  countdown();
  setInterval(countdown, 5000);
  console.log(days);

  return await res.render("home", {
    pageTitle: "Subomi & Ki",
    countdown: { days },
  });
};

export const password = (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.WEDDING_PASSWORD;
  if (password !== correctPassword) {
    return res.status(400).render("home", {
      errorMessage: "Password confirmation does not match.",
    });
  }
  req.session.loggedIn = true;
  return res.redirect("/");
};

export const info = (req, res) => {
  return res.render("info", {
    pageTitle: "Wedding info",
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
};
export const about = (req, res) => {
  return res.render("about", { pageTitle: "About" });
};

export const contact = (req, res) => {
  return res.render("contact", { pageTitle: "Contact" });
};
export const registry = (req, res) => {
  return res.render("registry", { pageTitle: "Registry" });
};

export const getRsvp = (req, res) => {
  return res.status(400).render("rsvp", {
    pageTitle: "RSVP",
  });
};

export const postRsvp = async (req, res) => {
  const { firstname, lastname, email, attending, attendingList, dietary } =
    req.body;
  console.log(attending);
  try {
    await rsvpModel.create({
      firstname,
      lastname,
      email,
      attending,
      attendingList,
      dietary,
      createdAt: Date.now(),
    });
    return res.render("rsvp", { successMessage: "✅ RSVP sent! ✅" });
  } catch (error) {
    console.log(error);
    return res.status(400).render("rsvp", {
      pageTitle: "RSVP",
      errorMessage: error._message,
    });
  }
};

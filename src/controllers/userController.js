import userModel from "../models/User";
import bcrypt from "bcrypt";
import Guest from "../models/guest";

export const getTokenAccess = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the guest by email and retrieve the token
    const guest = await Guest.findOne({ email });
    if (guest) {
      res.status(200).json({ token: guest.token });
    } else {
      res.status(404).json({ error: "Guest not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving guest information." });
  }
};

export const postTokenAccess = async (req, res) => {
  const { email } = req.body;
  try {
    const guest = new Guest({ email, token });
    await guest.save();
    res.status(200).json({ message: "Guest Information stored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error storing guest information" });
  }
};

export const { v4: uuidv4 } = require("uuid");

export const generateToken = async (email) => {
  const token = uuidv4();
  const expiresIn = new Date().getTime() + 60 * 60 * 1000;
  const guest = await Guest.findOne({ email });
  guest.token = token;
  guest.expiresIn = expiresIn;
  await guest.save();
  console.log(token);
  return token;
};

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { email, password, password2 } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await userModel.exists({ email });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This email is already taken.",
    });
  }
  try {
    await userModel.create({
      email,
      password,
      password2,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "❌ An account with this email does not exists. ❌",
    });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    populate: {
      path: "owner",
      model: "User",
    },
    select: "email",
  });
  return res.render("/", {
    pageTitle: user.firstname,
    user,
  });
};

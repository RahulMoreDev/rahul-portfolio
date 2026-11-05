const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  TOKEN_COOKIE_NAME,
  TOKEN_MAX_AGE_MS,
  getCookieOptions,
  getJwtSecret,
} = require("../config/auth");

const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,30}$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

function isValidCredentials(username, password) {
  return (
    typeof username === "string" &&
    USERNAME_PATTERN.test(username.trim()) &&  
    typeof password === "string" &&
    password.length >= PASSWORD_MIN_LENGTH &&
    Buffer.byteLength(password, "utf8") <= PASSWORD_MAX_BYTES
  );
}

function createSession(user, res) {
  const token = jwt.sign({ sub: user.id }, getJwtSecret(), {
    expiresIn: Math.floor(TOKEN_MAX_AGE_MS / 1000),
  });

  res.cookie(TOKEN_COOKIE_NAME, token, getCookieOptions());
}

function publicUser(user) {
  return { id: user.id, username: user.username };
}

async function register(req, res) {
  const { username, password } = req.body || {};

  if (!isValidCredentials(username, password)) {
    return res.status(400).json({
      message:
        "Username must be 3-30 letters, numbers, underscores, or hyphens; password must be at least 8 characters and at most 72 UTF-8 bytes",
    });
  }

  const user = await User.create({ username: username.trim(), password });
  createSession(user, res);

  return res.status(201).json({ user: publicUser(user) });
}

async function login(req, res) {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    Buffer.byteLength(password, "utf8") > PASSWORD_MAX_BYTES
  ) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = await User.findOne({ username: username.trim().toLowerCase() })
    .select("+password");
  const passwordMatches = user
    ? await user.comparePassword(password)
    : false;

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  createSession(user, res);
  return res.json({ user: publicUser(user) });
}

async function logout(req, res) {
  res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions());
  return res.json({ message: "Logged out" });
}

async function getCurrentUser(req, res) {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  return res.json({ user: publicUser(user) });
}

module.exports = { getCurrentUser, login, logout, register };

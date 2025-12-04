const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// DATABASE CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// USER MODEL
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// AUTH MIDDLEWARE
function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// ROUTE: REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user"
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// ROUTE: LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  });
});

// ROUTE: USER DASHBOARD (PROTECTED)
app.get("/api/user/dashboard", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ success: true, user });
});

// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));

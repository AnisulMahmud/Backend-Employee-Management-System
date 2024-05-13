const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registration

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please fill username nad password" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hasedPassword,
      role,
    });

    res.status(200).json({ message: "User registred successfully" });
  } catch (error) {
    res.status(400).json({ message: " Error in registration" });
  }
};

// logging

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please fill username and password" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is missing" });
    }

    const user = await User.findOne({ username });

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res
      .status(200)
      .json({ message: " User logged in Successfully", token: token });
  } catch (error) {
    res.status(400).json({ message: "Error in login" });
  }
};
module.exports = {
  register,
  login,
};

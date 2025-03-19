const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

// Regiter
exports.registerUser = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with this email.Please try again",
      });
    }
    const hashPassword = await bycrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration seccessful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does not exist please create an account first",
      });
    }
    const passwordMatch = await bycrypt.compare(password, checkUser.password);
    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "600m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Loged In Successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in logging In",
    });
  }
};

// Logout
exports.logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Loged out Successfully",
  });
};


// Auth Middleware
exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised User!",
    });
  }
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised User!",
    });
  }
};

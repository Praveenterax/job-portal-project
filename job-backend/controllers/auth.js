const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Job = require("../models/job");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const password = req.body.password;

  bcryptjs
    .hash(password, 12)
    .then((hashedPw) => {
      const newUser = new User({ ...req.body, password: hashedPw });
      return newUser.save();
    })
    .then((user) => {
      res.status(201).json({ message: "Registered Successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email does not exist");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcryptjs.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: loadedUser._id.toString(),
          userName: loadedUser.name,
          role: loadedUser.role,
        },
        "thisistooconfidential",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login Successful",
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

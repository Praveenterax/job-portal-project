const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("User already Exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6, max: 12 }),
    body("age").isInt({ min: 18, max: 60 }),
    body("mobile")
      .trim()
      .custom((value, { req }) => {
        const mobile_pattern = /^[1-9]{1}[0-9]{9}$/;
        if (!mobile_pattern.test(value)) {
          return Promise.reject("Invalid Mobile Number");
        }
        return true;
      }),
    body("gender").trim().not().isEmpty(),
    body("qualification").trim().not().isEmpty(),
    body("experience").trim().not().isEmpty(),
    body("role").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 6, max: 12 }),
  ],
  authController.login
);

module.exports = router;

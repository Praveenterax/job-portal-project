const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const User = require("../models/user");

const isAuthenticated = require("../middleware/is-authenticated");
const { isAuthorized, isAdmin } = require("../middleware/is-authorized");

const router = express.Router();

// user routes

router.get(
  "/dashboard-stats",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getStats
);
router.get(
  "/dashboard-recents",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getRecent
);

router.get(
  "/users",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getUsers
);

router.post(
  "/add-user",
  isAuthenticated,
  isAuthorized,
  isAdmin,
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
  adminController.postUser
);

router.get(
  "/users/:userId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getUser
);

router.put(
  "/edit-user/:userId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  [
    body("name").trim().not().isEmpty(),
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
  adminController.editUser
);

router.delete(
  "/users/:userId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.deleteUser
);

// job routes

router.get(
  "/jobs",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getJobs
);

router.post(
  "/add-job",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  [
    body("title").trim().not().isEmpty(),
    body("description").trim().not().isEmpty(),
    body("startDate").trim().not().isEmpty(),
    body("endDate").trim().not().isEmpty(),
    body("category").trim().not().isEmpty(),
  ],
  adminController.addJob
);

router.get(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.getJob
);

router.put(
  "/edit-job/:jobId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  [
    body("title").trim().not().isEmpty(),
    body("description").trim().not().isEmpty(),
    body("startDate").trim().not().isEmpty(),
    body("endDate").trim().not().isEmpty(),
    body("category").trim().not().isEmpty(),
  ],
  adminController.editJob
);

router.delete(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isAdmin,
  adminController.deleteJob
);

module.exports = router;

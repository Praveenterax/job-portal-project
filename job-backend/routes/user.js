const express = require("express");
// const { body } = require("express-validator");

const userController = require("../controllers/user");

const isAuthenticated = require("../middleware/is-authenticated");
const isApply = require("../middleware/is-apply");
const { isAuthorized, isUser } = require("../middleware/is-authorized");

const router = express.Router();

// job routes

router.get(
  "/jobsAvailable",
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getAvailableJobs
);
router.get(
  "/jobsApplied",
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getAppliedJobs
);

router.post(
  "/apply/:jobId",
  isAuthenticated,
  isAuthorized,
  isUser,
  isApply,
  userController.applyJob
);

module.exports = router;

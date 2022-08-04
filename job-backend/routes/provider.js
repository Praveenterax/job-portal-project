const express = require("express");
const { body } = require("express-validator");

const providerController = require("../controllers/provider");

const isAuthenticated = require("../middleware/is-authenticated");
const { isAuthorized, isProvider } = require("../middleware/is-authorized");

const router = express.Router();

// job routes

router.get(
  "/dashboard-stats",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getStats
);

router.get(
  "/dashboard-recents",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getRecents
);

router.get(
  "/jobs",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getJobs
);

router.post(
  "/add-job",
  isAuthenticated,
  isAuthorized,
  isProvider,
  [
    body("title").trim().not().isEmpty(),
    body("description").trim().not().isEmpty(),
    body("startDate").trim().not().isEmpty(),
    body("endDate").trim().not().isEmpty(),
    body("category").trim().not().isEmpty(),
  ],
  providerController.addJob
);

router.get(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getJob
);

router.put(
  "/edit-job/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  [
    body("title").trim().not().isEmpty(),
    body("description").trim().not().isEmpty(),
    body("startDate").trim().not().isEmpty(),
    body("endDate").trim().not().isEmpty(),
    body("category").trim().not().isEmpty(),
  ],
  providerController.editJob
);

router.delete(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.deleteJob
);

router.get(
  "/view-applicants/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getApplicantsForJob
);

router.get(
  "/view-shortlists/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getShortlistsForJob
);

router.get(
  "/applicants/view-resume/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getApplicantResume
);

router.patch(
  "/applicants/shortlist/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.shortlistApplicant
);
router.patch(
  "/applicants/reject/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.rejectApplicant
);

module.exports = router;

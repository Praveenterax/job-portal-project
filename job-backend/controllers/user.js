// const { validationResult } = require("express-validator");

const Job = require("../models/job");
const Applicant = require("../models/applicant");

const { clearResume } = require("../util/helper");
const { dateFormatter } = require("../util/helper");

exports.getAvailableJobs = (req, res, next) => {
  let appliedJobs = [];
  Applicant.find({ userId: req.userId })
    .lean()
    .then((applicants) => {
      applicants.forEach((applicant) => appliedJobs.push(applicant.jobId));
      return Job.find({ _id: { $not: { $in: appliedJobs } } }).lean();
    })
    .then((jobs) => {
      res.status(200).json({
        message: "Fetched the list of jobs",
        jobs: jobs,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getAppliedJobs = (req, res, next) => {
  let appliedJobs = [];
  const statusMap = new Map();
  Applicant.find({ userId: req.userId })
    .lean()
    .then((applicants) => {
      // console.log(applicants);
      applicants.forEach((applicant) => {
        appliedJobs.push(applicant.jobId);
        statusMap.set(applicant.jobId.toString(), applicant.status);
      });
      return Job.find({ _id: { $in: appliedJobs } }).lean();
    })
    .then((jobsApplied) => {
      jobsApplied.forEach((applied) => {
        applied.status = statusMap.get(applied._id.toString());
      });
      res.status(200).json({
        message: "Fetched the list of jobs",
        jobsApplied: jobsApplied,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.applyJob = (req, res, next) => {
  if (!req.file) {
    const err = new Error("Resume not Found");
    err.statusCode = 422;
    throw err;
  }
  const jobId = req.params.jobId;
  const userId = req.userId;
  const providerId = req.body.providerId;
  const resume = req.file.path.replace("\\", "/");
  let status;

  Applicant.findOne({ jobId: jobId, userId: userId })
    .then((applicant) => {
      if (applicant) {
        clearResume(resume);
        return res
          .status(409)
          .json({ message: "You have already applied for the job!" });
      }
      status = "Applied on " + dateFormatter();

      const newApplicant = new Applicant({
        jobId: jobId,
        userId: userId,
        resume: resume,
        status: status,
        providerId: providerId,
      });
      return newApplicant.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Successfully applied for the job!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

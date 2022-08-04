const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const Job = require("../models/job");
const Applicant = require("../models/applicant");
const { clearResume } = require("../util/helper");

exports.getStats = (req, res, next) => {
  let providerCount;
  let jobCount;
  let applicantCount;
  let seekerCount;
  User.find({ _id: { $ne: req.userId }, role: "Job Provider" })
    .countDocuments()
    .then((count) => {
      providerCount = count;
      return User.find({
        _id: { $ne: req.userId },
        role: "User",
      }).countDocuments();
    })
    .then((count) => {
      seekerCount = count;
      return Job.find().countDocuments();
    })
    .then((count) => {
      jobCount = count;
      return Applicant.find().countDocuments();
    })
    .then((count) => {
      applicantCount = count;
      res.status(200).json({
        message: "Successfully fetched stats",
        stats: { jobCount, providerCount, applicantCount, seekerCount },
      });
    });
};

exports.getRecent = (req, res, next) => {
  let recentUsers = [];
  let recentJobs = [];
  User.find({ _id: { $ne: req.userId } })
    .lean()
    .sort({ createdAt: -1 })
    .limit(3)
    .then((users) => {
      recentUsers = users;
      return Job.find().lean().sort({ createdAt: -1 }).limit(3);
    })
    .then((jobs) => {
      recentJobs = jobs;
      res.status(200).json({
        message: "Successfully fetched recent stats",
        recentUsers,
        recentJobs,
      });
    });
};

exports.getUsers = (req, res, next) => {
  User.find({ _id: { $ne: req.userId } })
    .lean()
    .then((users) => {
      res.status(200).json({
        message: "Fetched the list of users",
        users: users,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postUser = (req, res, next) => {
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
      res.status(201).json({ message: "User Added Successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .lean()
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Fetched the user Successfully", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editUser = (req, res, next) => {
  const userId = req.params.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (userId === req.userId) {
    const error = new Error("Cannot edit the current User");
    error.statusCode = 401;
    throw error;
  }

  User.findByIdAndUpdate(userId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else
        res.status(200).json({ message: "User was updated successfully." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  if (userId === req.userId) {
    const error = new Error("Cannot delete the current User");
    error.statusCode = 401;
    throw error;
  }

  let jobs;
  let role;
  let resumes = [];
  let applicants = [];

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Cannot delete user. User not found!");
        error.statusCode = 404;
        throw err;
      }
      role = user.role;
      if (role === "Job Provider") {
        jobs = user.jobsPosted;
      }
      return User.findByIdAndDelete(userId);
    })
    .then((result) => {
      if (role === "Job Provider") {
        return Job.deleteMany({ _id: { $in: jobs } });
      }
    })
    .then((result) => {
      if (role === "Job Provider") {
        return Applicant.find({ providerId: userId }).then((docs) => {
          docs.forEach((doc) => {
            resumes.push(doc.resume);
            applicants.push(doc._id);
          });
        });
      }
      if (role === "User") {
        return Applicant.find({ userId: userId }).then((docs) => {
          docs.forEach((doc) => {
            resumes.push(doc.resume);
            applicants.push(doc._id);
          });
        });
      }
    })
    .then((result) => {
      return Applicant.deleteMany({ _id: { $in: applicants } });
    })
    .then((result) => {
      resumes.forEach((resume) => clearResume(resume));
      res.json({
        message: "User record was deleted successfully!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getJobs = (req, res, next) => {
  Job.find()
    .lean()
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

exports.addJob = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  let jobId;

  const newJob = new Job({ ...req.body, providerId: req.userId });
  newJob
    .save()
    .then((job) => {
      jobId = job._id;
      return User.findById(req.userId);
    })
    .then((user) => {
      user.jobsPosted.push(jobId);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Job Added Successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getJob = (req, res, next) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .lean()
    .then((job) => {
      if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Fetched the job Successfully", job: job });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editJob = (req, res, next) => {
  const jobId = req.params.jobId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  Job.findByIdAndUpdate(jobId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update job with id=${id}. Maybe job was not found!`,
        });
      } else res.status(200).json({ message: "Job was updated successfully." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteJob = (req, res, next) => {
  const jobId = req.params.jobId;
  let providerId;
  let resumes = [];
  let applicants = [];

  Job.findById(jobId)
    .then((job) => {
      if (!job) {
        const error = new Error("Cannot delete job. Job not found!");
        error.statusCode = 404;
        throw err;
      }
      providerId = job.providerId;
      return Job.findByIdAndDelete(jobId);
    })
    .then((result) => {
      return User.findByIdAndUpdate(
        { _id: providerId },
        { $pull: { jobsPosted: jobId } }
      );
    })
    .then((result) => {
      return Applicant.find({ jobId: jobId }).then((docs) => {
        docs.forEach((doc) => resumes.push(doc.resume));
        docs.forEach((doc) => applicants.push(doc._id));
      });
    })
    .then((result) => {
      return Applicant.deleteMany({ _id: { $in: applicants } });
    })
    .then((result) => {
      resumes.forEach((resume) => clearResume(resume));
      res.json({
        message: "Job record was deleted successfully!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

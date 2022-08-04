const multer = require("multer");
const { v4: uuid } = require("uuid");
const express = require("express");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resumes");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + "_" + req.userId + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("resume")
);

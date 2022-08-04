const User = require("../models/user");

exports.isAuthorized = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      req.role = user.role;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.isAdmin = (req, res, next) => {
  // console.log(req.role);
  if (req.role !== "Admin") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};
exports.isProvider = (req, res, next) => {
  if (req.role !== "Job Provider") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};
exports.isUser = (req, res, next) => {
  if (req.role !== "User") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};

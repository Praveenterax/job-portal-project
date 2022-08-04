const path = require("path");
const fs = require("fs");

exports.clearResume = (filePath) => {
  const absPath = path.join(__dirname, "..", filePath);
  fs.unlink(absPath, (err) => {
    console.log(err);
  });
};

exports.dateFormatter = (givenDate) => {
  let date;
  if (givenDate) {
    date = new Date(givenDate);
  } else {
    date = new Date();
  }
  return date.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

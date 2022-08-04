const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const provApplicantSchema = new Schema(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Applicant",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProvApplicant", provApplicantSchema);

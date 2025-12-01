const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    data: { type: Object, default: {} },
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", ResponseSchema);

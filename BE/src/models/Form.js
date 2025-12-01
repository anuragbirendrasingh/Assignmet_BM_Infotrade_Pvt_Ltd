const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  id: String,
  type: String,
  label: String,
  name: String,
  placeholder: String,
  required: Boolean,
  options: [String],
  style: Object,
  order: Number,
});

const FormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    slug: { type: String, required: true, unique: true },
    fields: [FieldSchema],
    settings: {
      theme: String,
      font: String,
      colors: Object,
      layout: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);

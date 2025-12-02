// controllers/formController.js

const Form = require("../models/Form");
const generateUniqueSlug = require("../utils/generateUniqueSlug");

//  Create New Form
exports.createForm = async (req, res) => {
  try {
    const { title, description, fields, settings } = req.body;

    const slug = await generateUniqueSlug(title);

    const newForm = await Form.create({
      title,
      description,
      fields,
      settings,
      slug,
    });

    return res.status(201).json(newForm);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

//  Get All Forms
exports.listForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    return res.json(forms);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//  Get Form By Slug
exports.getFormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.json(form);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//  Update Form
exports.updateForm = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const updatedForm = await Form.findOneAndUpdate(
      { slug },
      updates,
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.json(updatedForm);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//  Duplicate Form
exports.duplicateForm = async (req, res) => {
  try {
    const { slug } = req.params;

    const form = await Form.findOne({ slug });

    if (!form) {
      return res.status(404).json({ message: "Original form not found" });
    }

    const newSlug = await generateUniqueSlug(form.title + "-copy");

    const duplicate = await Form.create({
      title: form.title + " (Copy)",
      description: form.description,
      fields: form.fields,
      settings: form.settings,
      slug: newSlug,
    });

    return res.status(201).json(duplicate);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.deleteForm = async (req, res) => {
  try {
    const { slug } = req.params;

    const deleted = await Form.findOneAndDelete({ slug });

    if (!deleted) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


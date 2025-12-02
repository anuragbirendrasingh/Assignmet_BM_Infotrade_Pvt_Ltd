const express = require("express");
const router = express.Router();

const formController = require("../controllers/formController");
const responseController = require("../controllers/responseController");

/* ------------------------------ FORM ROUTES ------------------------------ */

// Create new form
router.post("/forms", formController.createForm);

// Get all forms
router.get("/forms", formController.listForms);

// Get form by slug
router.get("/forms/:slug", formController.getFormBySlug);

// Update form by slug
router.put("/forms/:slug", formController.updateForm);

// Duplicate form by slug
router.post("/forms/:slug/duplicate", formController.duplicateForm);

// Delete form by slug
router.delete("/forms/:slug", formController.deleteForm);


/* ---------------------------- RESPONSE ROUTES ---------------------------- */

// Submit response to a form
router.post("/forms/:slug/submit", responseController.submitResponse);

// Get all responses for a form
router.get("/forms/:slug/responses", responseController.getResponsesForForm);

module.exports = router;

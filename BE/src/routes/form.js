const express = require("express");
const router = express.Router();

const formController = require("../controllers/formController");
const responseController = require("../controllers/responseController");

// Forms
router.post("/forms", formController.createForm);
router.get("/forms", formController.listForms);
router.get("/forms/:slug", formController.getFormBySlug);
router.put("/forms/:id", formController.updateForm);
router.post("/forms/:id/duplicate", formController.duplicateForm);
router.delete("/forms/:id", formController.deleteForm);

// Responses
router.post("/forms/:slug/submit", responseController.submitResponse);
router.get("/forms/:id/responses", responseController.getResponsesForForm);

module.exports = router;
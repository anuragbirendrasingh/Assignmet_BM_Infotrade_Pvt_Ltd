const Response = require("../models/Response");
const Form = require("../models/Form");
const { stringify } = require("csv-stringify");

exports.submitResponse = async (req, res) => {
  try {
    const { slug } = req.params;
    const form = await Form.findOne({ slug });
    if (!form) return res.status(404).json({ message: "Form not found" });

    const data = req.body;
    const resp = await Response.create({
      form: form._id,
      data,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    res.status(201).json({ success: true, id: resp._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResponsesForForm = async (req, res) => {
  try {
    const { id } = req.params; // form id
    const responses = await Response.find({ form: id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportResponsesCSV = async (req, res) => {
  try {
    const { id } = req.params; // form id
    const responses = await Response.find({ form: id }).lean();
    // build CSV rows
    if (responses.length === 0) return res.status(200).send("No responses");

    // collect all field keys
    const allKeys = new Set();
    responses.forEach((r) =>
      Object.keys(r.data || {}).forEach((k) => allKeys.add(k))
    );
    const headers = ["_id", "createdAt", ...Array.from(allKeys)];

    const records = responses.map((r) => {
      const row = [r._id, r.createdAt];
      Array.from(allKeys).forEach((k) => row.push(r.data?.[k] ?? ""));
      return row;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="responses-${id}.csv"`
    );

    const stringifier = stringify({ header: true, columns: headers });
    stringifier.pipe(res);
    records.forEach((r) => stringifier.write(r));
    stringifier.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

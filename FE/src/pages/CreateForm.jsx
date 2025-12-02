import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForms } from "../context/FormContext";
import FieldControls from "../components/FieldControls";
import FieldPreview from "../components/FieldPreview";

export default function CreateForm() {
  const { createForm, updateForm, forms, loadForms } = useForms();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🚀 This is SLUG, not ID
  const editSlug = searchParams.get("editId");

  // Load forms initially
  useEffect(() => {
    if (forms.length === 0) loadForms();
  }, []);

  // Load form details if editing
  useEffect(() => {
    if (!editSlug) return;

    // Try from context first
    const f = forms.find((x) => x.slug === editSlug);

    if (f) {
      setTitle(f.title || "");
      setDescription(f.description || "");
      setFields(f.fields || []);
    } else {
      // Fetch from backend if needed
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE || "http://localhost:7005/api"}/forms/${editSlug}`
          );

          if (!res.ok) return;

          const json = await res.json();
          setTitle(json.title || "");
          setDescription(json.description || "");
          setFields(json.fields || []);
        } catch (err) {
          console.error("Load form failed:", err);
        }
      })();
    }
  }, [editSlug, forms]);

  // Save / Update form
  async function handleSave() {
    if (!title.trim()) return alert("Title required!");

    setSaving(true);

    const payload = { title, description, fields };

    try {
      if (editSlug) {
        // UPDATE using slug
        await updateForm(editSlug, payload);
        alert("Form updated!");
      } else {
        await createForm(payload);
        alert("Form created!");
      }

      navigate("/manage");
    } catch (err) {
      console.error(err);
      alert("Error saving form");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">
          {editSlug ? "Edit Form" : "Create New Form"}
        </h2>

        <input
          type="text"
          placeholder="Form Title"
          className="border w-full px-3 py-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          className="border w-full px-3 py-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FieldControls fields={fields} setFields={setFields} />

        <button
          disabled={saving}
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Saving..." : editSlug ? "Update Form" : "Create Form"}
        </button>
      </div>

      <div className="border p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Live Preview</h2>
        <FieldPreview fields={fields} />
      </div>
    </div>
  );
}



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
  const editId = searchParams.get("editId");

  // Load forms if not already loaded
  useEffect(() => {
    if (forms.length === 0) loadForms();
  }, []);

  // If editing mode, load existing form
  useEffect(() => {
    if (!editId) return;

    const f = forms.find((x) => x._id === editId);

    if (f) {
      setTitle(f.title || "");
      setDescription(f.description || "");
      setFields(f.fields || []);
    } else {
      // Fallback to backend fetch
      (async () => {
        try {
          const data = await fetch(
            `${import.meta.env.VITE_API_BASE || "http://localhost:7005/api"}/forms/${editId}`
          );
          if (!data.ok) return;

          const json = await data.json();
          setTitle(json.title || "");
          setDescription(json.description || "");
          setFields(json.fields || []);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [editId, forms]);


  // SAVE FORM
  async function handleSave() {
    if (!title.trim()) return alert("Title required");

    setSaving(true);

    try {
      const payload = { title, description, fields };

      if (editId) {
        // --- Update Existing Form ---
        await updateForm(editId, payload);
        alert("Form updated successfully");
        navigate("/manage");
      } else {
        // --- Create New Form ---
        await createForm(payload);
        alert("Form created successfully");
        navigate("/manage");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving form");
    } finally {
      setSaving(false);
    }
  }


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT: Form Controls */}
      <div className="border p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">
          {editId ? "Edit Form" : "Create New Form"}
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
          {saving ? "Saving..." : editId ? "Update Form" : "Create Form"}
        </button>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="border p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Live Preview</h2>
        <FieldPreview fields={fields} />
      </div>
    </div>
  );
}


import React from "react";
import { Link } from "react-router-dom";
import { useForms } from "../context/FormContext";

export default function ManageForms() {
  const { forms, loading, deleteForm, duplicateForm } = useForms();

  async function exportCSV(id, title) {
    try {
      const url = `${
        import.meta.env.MONGO_URI || "http://localhost:7005/api"
      }/forms/${id}/responses/export`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${title || "responses"}-${id}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Export error: " + err.message);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Manage Forms</h2>
      {forms.length === 0 && (
        <div className="text-sm text-gray-500">No forms yet</div>
      )}
      <div className="space-y-3">
        {forms.map((f) => (
          <div
            key={f._id}
            className="bg-white p-3 rounded shadow flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{f.title}</div>
              <div className="text-xs text-gray-500">{f.slug}</div>
            </div>
            <div className="space-x-2">
              <Link
                to={`/forms/${f.slug}`}
                className="px-2 py-1 border rounded text-sm"
              >
                Open
              </Link>
              <Link
                to={`/create?editId=${f._id}`}
                className="px-2 py-1 border rounded text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => duplicateForm(f._id)}
                className="px-2 py-1 border rounded text-sm"
              >
                Duplicate
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete?")) deleteForm(f._id);
                }}
                className="px-2 py-1 text-red-500 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => exportCSV(f._id, f.title)}
                className="px-2 py-1 border rounded text-sm"
              >
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

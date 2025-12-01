import React from "react";

export default function FieldPreview({ fields }) {
  return (
    <div className="space-y-4">
      {fields.length === 0 && <div className="text-sm text-gray-500">No fields yet</div>}
      {fields.map(f => (
        <div key={f.id}>
          {f.type === "text" && (
            <div>
              <label className="block text-sm font-medium">{f.label}{f.required && ' *'}</label>
              <input className="mt-1 w-full border p-2 rounded" placeholder={f.placeholder} />
            </div>
          )}
          {f.type === "select" && (
            <div>
              <label className="block text-sm font-medium">{f.label}{f.required && ' *'}</label>
              <select className="mt-1 w-full border p-2 rounded">
                {(f.options || []).map((o, i) => <option key={i}>{o}</option>)}
              </select>
            </div>
          )}
          {f.type === "checkbox" && (
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label className="text-sm">{f.label}</label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

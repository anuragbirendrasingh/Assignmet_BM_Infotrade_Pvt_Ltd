import React from "react";


export default function FieldControls({ fields, setFields }) {
  function addField(type) {
    const id = Date.now().toString();
    const base = {
      id,
      type,
      label: type === "text" ? "Text field" : type === "select" ? "Select" : "Checkbox",
      name: `field_${id}`,
      placeholder: "",
      required: false,
      options: type === "select" ? ["Option 1", "Option 2"] : [],
    };
    setFields(prev => [...prev, base]);
  }

  function updateField(id, patch) {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  }

  function removeField(id) {
    setFields(prev => prev.filter(f => f.id !== id));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={() => addField("text")} className="px-2 py-1 border rounded text-sm">Add Text</button>
        <button onClick={() => addField("select")} className="px-2 py-1 border rounded text-sm">Add Select</button>
        <button onClick={() => addField("checkbox")} className="px-2 py-1 border rounded text-sm">Add Checkbox</button>
      </div>

      <div className="space-y-2">
        {fields.map(field => (
          <div key={field.id} className="p-3 bg-white rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{field.type.toUpperCase()}</div>
              <div className="text-sm space-x-1">
                <button onClick={() => removeField(field.id)} className="text-red-500">Remove</button>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <input className="border p-1 text-sm" value={field.label} onChange={e => updateField(field.id, { label: e.target.value })} />
              <input className="border p-1 text-sm" value={field.name} onChange={e => updateField(field.id, { name: e.target.value })} />
              {field.type === "text" && (
                <input className="border p-1 text-sm col-span-2" placeholder="placeholder" value={field.placeholder} onChange={e => updateField(field.id, { placeholder: e.target.value })} />
              )}
              {field.type === "select" && (
                <textarea className="border p-1 text-sm col-span-2" rows={2} value={(field.options || []).join("\n")} onChange={e => updateField(field.id, { options: e.target.value.split("\n").filter(Boolean) })} />
              )}
              <label className="col-span-2 text-sm">
                <input type="checkbox" checked={field.required || false} onChange={e => updateField(field.id, { required: e.target.checked })} /> Required
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJSON, API_BASE } from "../utils/api";

export default function FillForm() {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJSON(`/forms/${slug}`);
        setForm(data);
      } catch (err) {
        console.error(err);
        setForm(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  function handleChange(name, value) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/forms/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
    } catch (err) {
      alert("Submit error: " + err.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;
  if (done) return <div className="bg-white p-4 rounded shadow">Thanks! Your response is saved.</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{form.title}</h2>
      <p className="text-sm text-gray-600">{form.description}</p>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        {(form.fields || []).map(f => (
          <div key={f.id}>
            {f.type === "text" && (
              <>
                <label className="block text-sm">{f.label}{f.required && ' *'}</label>
                <input className="mt-1 w-full border p-2 rounded" placeholder={f.placeholder} required={f.required}
                  onChange={e => handleChange(f.name, e.target.value)} />
              </>
            )}

            {f.type === "select" && (
              <>
                <label className="block text-sm">{f.label}{f.required && ' *'}</label>
                <select className="mt-1 w-full border p-2 rounded" required={f.required} onChange={e => handleChange(f.name, e.target.value)}>
                  <option value="">Select</option>
                  {(f.options || []).map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
              </>
            )}

            {f.type === "checkbox" && (
              <label className="flex items-center gap-2">
                <input type="checkbox" onChange={e => handleChange(f.name, e.target.checked)} />
                <span>{f.label}</span>
              </label>
            )}
          </div>
        ))}

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

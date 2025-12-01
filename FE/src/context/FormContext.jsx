import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchJSON } from "../utils/api";

const FormContext = createContext();

export function useForms() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadForms() {
    setLoading(true);
    try {
      const data = await fetchJSON("/forms");
      setForms(data);
    } catch (err) {
      console.error("Load forms error:", err.message);
      setForms([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForms();
  }, []);

  async function createForm(payload) {
    const res = await fetchJSON("/forms", { method: "POST", body: JSON.stringify(payload) });
    setForms(prev => [res, ...prev]);
    return res;
  }

  async function updateForm(id, payload) {
    const res = await fetchJSON(`/forms/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    setForms(prev => prev.map(f => (f._id === id ? res : f)));
    return res;
  }

  async function deleteForm(id) {
    await fetchJSON(`/forms/${id}`, { method: "DELETE" });
    setForms(prev => prev.filter(f => f._id !== id));
  }

  async function duplicateForm(id) {
    const res = await fetchJSON(`/forms/${id}/duplicate`, { method: "POST" });
    setForms(prev => [res, ...prev]);
  }

  return (
    <FormContext.Provider value={{
      forms, loading, loadForms, createForm, updateForm, deleteForm, duplicateForm
    }}>
      {children}
    </FormContext.Provider>
  );
}

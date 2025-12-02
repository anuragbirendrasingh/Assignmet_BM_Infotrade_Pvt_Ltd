import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchJSON } from "../utils/api";

const FormContext = createContext();

export function useForms() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all forms
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

  // Create form
  async function createForm(payload) {
    const res = await fetchJSON("/forms", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setForms((prev) => [res, ...prev]);
    return res;
  }

  // Update form by SLUG
  async function updateForm(slug, payload) {
    const res = await fetchJSON(`/forms/${slug}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    setForms((prev) => prev.map((f) => (f.slug === slug ? res : f)));
    return res;
  }

  // Delete form by SLUG
  async function deleteForm(slug) {
    await fetchJSON(`/forms/${slug}`, { method: "DELETE" });
    setForms((prev) => prev.filter((f) => f.slug !== slug));
  }

  // Duplicate form by SLUG
  async function duplicateForm(slug) {
    const res = await fetchJSON(`/forms/${slug}/duplicate`, { method: "POST" });
    setForms((prev) => [res, ...prev]);
    return res;
  }

  return (
    <FormContext.Provider
      value={{
        forms,
        loading,
        loadForms,
        createForm,
        updateForm,
        deleteForm,
        duplicateForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}




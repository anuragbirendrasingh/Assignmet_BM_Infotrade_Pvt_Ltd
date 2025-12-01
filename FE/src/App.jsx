import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import ManageForms from "./pages/ManageForms";
import FillForm from "./pages/FillForm";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/manage" element={<ManageForms />} />
          <Route path="/forms/:slug" element={<FillForm />} />
        </Routes>
      </main>
    </div>
  );
}



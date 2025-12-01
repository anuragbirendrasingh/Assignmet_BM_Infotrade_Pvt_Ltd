import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">No-code Dynamic Forms</h1>
      <p className="mt-2 text-sm">Create, manage and share forms. Simple UI for assignment.</p>
      <div className="mt-4 space-x-2">
        <Link to="/create" className="px-3 py-2 bg-blue-500 text-white rounded">Create Form</Link>
        <Link to="/manage" className="px-3 py-2 border rounded">Manage Forms</Link>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">NoCode Forms</Link>
        <div className="space-x-3">
          <Link to="/create" className="px-3 py-1 rounded bg-blue-500 text-white text-sm">Create</Link>
          <Link to="/manage" className="px-3 py-1 rounded border text-sm">Manage</Link>
        </div>
      </div>
    </nav>
  );
}

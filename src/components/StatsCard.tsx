// src/components/review/StatsCard.jsx
import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="border rounded-xl shadow-sm bg-white p-6 flex items-center gap-4 hover:shadow-md transition">
      {icon && <div className="text-3xl text-blue-600">{icon}</div>}

      <div>
        <h3 className="text-gray-700 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

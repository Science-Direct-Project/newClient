// src/components/review/ScoreInput.jsx
import React from "react";

export default function ScoreInput({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-medium">{label}</label>
      <input
        type="number"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded border p-2"
      />
    </div>
  );
}

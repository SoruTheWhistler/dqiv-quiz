import React from "react";
import "./ResultText.css";

export default function ResultText({ names, type }) {
  const n = names[0].name;
  return (
    <div className={`result-text ${type}`}>
      <p>{n}</p>
    </div>
  );
}

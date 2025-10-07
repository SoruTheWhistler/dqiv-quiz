import React from "react";
import "./MonsterCounter.css";

export default function MonsterCounter({ currentIndex, total }) {
  return (
    <div className="monster-counter">
      {currentIndex} / {total}
    </div>
  );
}

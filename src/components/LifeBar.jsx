import React from "react";

import life from "../img/life.png";
import lostLife from "../img/lost_life.png";

import "./LifeBar.css";

export default function LifeBar({ lives, maxHP }) {
  return (
    <div className="life-bar">
      {[...Array(maxHP)].map((_, i) => (
        <img
          key={i}
          className={`hp ${i < lives ? "full" : "empty"}`}
          src={i < lives ? life : lostLife}
          alt={i < lives ? "♥" : "x"}
        />
      ))}
    </div>
  );
}

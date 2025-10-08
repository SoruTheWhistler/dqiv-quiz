import React, { useState } from "react";
import "./StartScreen.css";

export default function StartScreen({ onStart, maxMonsters }) {
  const [numMonsters, setNumMonsters] = useState(Math.min(10, maxMonsters));

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(numMonsters);
  };

  return (
    <main id="start-screen">
      <h1 className="start-title">Dragon Quest IV<br/>Quiz visuel des monstres</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de monstres :
          <input
            type="number"
            min="5"
            step="5"
            max={maxMonsters}
            value={numMonsters}
            onChange={(e) => setNumMonsters(Number(e.target.value))}
          />
        </label>
        <button type="submit">Commencer</button>
        <p className="disclaimer">Seuls les noms des monstres dans Dragon Quest IV sont valides ; ceux utilisés dans d'autres opus ne sont pas pris en compte.</p>
      </form>
    </main>
  );
}

import React from "react";

import "./GameOver.css";

export default function GameOver({ onRestart }) {
  return (
    <main id="game-over">
      <div className="game-over-title">
        <img src="/img/coffin.png" alt="⚰"/>
        <h1>Game Over</h1>
        <img src="/img/coffin.png" alt="⚰"/>
      </div>
      
      <button onClick={onRestart}>Rejouer</button>
    </main>
  );
}

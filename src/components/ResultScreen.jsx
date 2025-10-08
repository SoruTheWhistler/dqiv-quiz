import React from "react";
import "./ResultScreen.css";

export default function ResultScreen({
  lives,
  maxHP,
  score,
  total,
  attempts,
  onRestart,
}) {
  return (
    <div id="result-screen">
      <h1>Résultats</h1>
      <p>Score : <strong>{score}</strong> / {total}{" "}</p>
      {/* <p>Vies restantes : {lives} / {maxHP}</p> */}

      <table className="results-table">
        <thead>
          <tr>
            <th>Monstre</th>
            <th>Ta réponse</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a, i) => (
            <tr key={i} className={a.correct ? "correct" : "wrong"}>
              <td>{a.monster}</td>
              <td>{a.userAnswer || "(vide)"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onRestart}>Rejouer</button>
    </div>
  );
}

import React from "react";
import "./ResultScreen.css";

import SecretScreen from "./SecretScreen";

export default function ResultScreen({
  lives,
  maxHP,
  score,
  total,
  attempts,
  onRestart,
}) {
  // Score shouldn't be higher than total
  if (score > total) return <SecretScreen msg="C'est pas bien de tricher !"/>
  return (
    <div
      id="result-screen"
      className={
        score === 214
          ? "highest-score"
          : score === 0
          ? "worst-score"
          : score <= total / 4
          ? "low-score"
          : score <= total / 2
          ? "half-score"
          : score < total
          ? "good-score"
          : "best-score"
      }
    >
      <h1>Résultats</h1>
      <h2>
        Score : {score} / {total}
      </h2>
      {/* <p>Vies restantes : {lives} / {maxHP}</p> */}

      <table className="results-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Monstre</th>
            <th>Ta réponse</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a, i) => (
            <tr key={i} className={a.correct ? "correct" : "wrong"}>
              <td>{i + 1}</td>
              <td>
                <a
                  href={
                    "https://wikidragonquest.fr/" + a.monster.replace(" ", "_")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.monster}
                </a>
              </td>
              <td>{a.userAnswer || "(vide)"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onRestart}>Rejouer</button>
    </div>
  );
}

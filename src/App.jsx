import React, { useState } from "react";

import { normalize } from "./utils/normalize";
import { shuffle } from "./utils/shuffle";

import LifeBar from "./components/LifeBar";
import MonsterCounter from "./components/MonsterCounter";
import MonsterImage from "./components/MonsterImage";
import AnswerInput from "./components/AnswerInput";
import ResultText from "./components/ResultText";
import GameOver from "./components/GameOver";

import monsters from "./data/monsters.json";
import "./App.css";

shuffle(monsters);

const maxHP = 5;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(maxHP);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const currentMonster = monsters[currentIndex];
  const totalMonsters = monsters.length;

  const handleAnswerSubmit = (userInput) => {
    const normalizedInput = normalize(userInput);
    const isGood = currentMonster.names.some(
      (n) => normalize(n.name) === normalizedInput
    );

    if (isGood) {
      setFeedback({ type: "correct", data: currentMonster.names });
    } else {
      setFeedback({ type: "wrong", data: currentMonster.names });

      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) setGameOver(true);
        return newLives;
      });
    }

    // Passe automatiquement au monstre suivant après 1,5s
    setTimeout(() => {
      setFeedback(null);
      setAnswer("");
      setCurrentIndex((prev) => (prev + 1) % totalMonsters);
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswer("");
    setLives(maxHP);
    setFeedback(null);
    setGameOver(false);
  };

  if (gameOver) {
    return <GameOver onRestart={handleRestart} />;
  }

  // ✅ Détermination de la classe selon les PV restants
  let hpClass = "full-hp";
  if (lives < maxHP && lives >= maxHP / 2) hpClass = "high-hp";
  if (lives < maxHP / 2 && lives > maxHP / 4) hpClass = "half-hp";
  if (lives <= maxHP / 4) hpClass = "low-hp";

  return (
    <>
      <main id="game-container" className={hpClass}>
        <LifeBar lives={lives} maxHP={maxHP}/>
        <MonsterCounter currentIndex={currentIndex} total={totalMonsters} />
        {feedback && <ResultText names={feedback.data} type={feedback.type} />}
        <MonsterImage
          src={currentMonster.image}
          alt={currentMonster.names[0].name}
          feedback={feedback}
        />

        <AnswerInput
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleAnswerSubmit}
          disabled={!!feedback}
          feedback={feedback}
        />
      </main>
    </>
  );
}

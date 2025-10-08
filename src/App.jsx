import React, { useState } from "react";

import { normalize } from "./utils/normalize";
import { shuffle } from "./utils/shuffle";

import LifeBar from "./components/LifeBar";
import MonsterCounter from "./components/MonsterCounter";
import MonsterImage from "./components/MonsterImage";
import AnswerInput from "./components/AnswerInput";
import ResultText from "./components/ResultText";
import StartScreen from "./components/StartScreen";
import ResultScreen from "./components/ResultScreen";

import monsters from "./data/monsters.json";
import "./App.css";

const maxHP = 5;

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(maxHP);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);

  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const totalMonsters = selectedMonsters.length;

  const handleGameStart = (count) => {
    if (count < 5) {
      alert("Tu vas pas aller bien loin avec une valeur inférieure à 5 ! Permets-moi de te la mettre à 10, pour la peine.");
      count = 10;
    }
    if (count > 214) {
      window.location.href = "https://geekireland.com/wp-content/uploads/2014/10/1394132_550638398351602_1299866476_n.jpg";
      return;
    }
    const shuffled = [...monsters];
    shuffle(shuffled);

    setSelectedMonsters(shuffled.slice(0, count));
    setSelectedCount(count);
    setGameStarted(true);
    setLives(maxHP);
    setScore(0);
    setFeedback(null);
    setCurrentIndex(0);
    setGameOver(false);
    setAttempts([]);
  };

  const handleAnswerSubmit = (userInput) => {
    if (!selectedMonsters.length) return;
    if (userInput.length > 25) {
      window.location.href = "https://www.youtube.com/watch?v=NZh5YxDpuK4";
      return;
    }

    const currentMonster = selectedMonsters[currentIndex];
    const normalizedInput = normalize(userInput);
    const isGood = currentMonster.names.some(
      (n) => normalize(n.name) === normalizedInput
    );

    // 🆕 Sauvegarde de la tentative
    setAttempts((prev) => [
      ...prev,
      {
        monster: currentMonster.names[0].name,
        userAnswer: userInput,
        correct: isGood,
      },
    ]);

    if (isGood) {
      setFeedback({ type: "correct", data: currentMonster.names });
      setScore((s) => s + 1);
    } else {
      setFeedback({ type: "wrong", data: currentMonster.names });
      /* Unused lives system ; not sure how to implement it...
      Also remove the "display: none;" line in LifeBar.css to reactivate it */
      // setLives((prev) => {
      //   const newLives = prev - 1;
      //   if (newLives <= 0) {
      //     setTimeout(() => setGameOver(true), 1600);
      //   }
      //   return newLives;
      // });
    }

    setTimeout(() => {
      setFeedback(null);
      setAnswer("");
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= totalMonsters && lives > 0) {
          setTimeout(() => setGameOver(true), 800);
        }
        return next;
      });
    }, 1500);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setSelectedMonsters([]);
    setAnswer("");
    setLives(maxHP);
    setFeedback(null);
    setGameOver(false);
    setScore(0);
    setCurrentIndex(0);
    setAttempts([]);
  };

  if (!gameStarted) {
    return (
      <StartScreen onStart={handleGameStart} maxMonsters={monsters.length} />
    );
  }

  if (gameOver) {
    return (
      <ResultScreen
        lives={lives}
        maxHP={maxHP}
        score={score}
        total={selectedCount}
        attempts={attempts}
        onRestart={handleRestart}
      />
    );
  }

  const currentMonster = selectedMonsters[currentIndex];

  let hpClass = "full-hp";
  if (lives < maxHP && lives >= maxHP / 2) hpClass = "high-hp";
  if (lives < maxHP / 2 && lives > maxHP / 4) hpClass = "half-hp";
  if (lives <= maxHP / 4) hpClass = "low-hp";

  return (
    <main id="game-container" className={hpClass}>
      <LifeBar lives={lives} maxHP={maxHP} />
      <MonsterCounter currentIndex={currentIndex} total={totalMonsters} />
      {feedback && <ResultText names={feedback.data} type={feedback.type} />}

      {currentMonster && (
        <MonsterImage
          src={currentMonster.image}
          alt={currentMonster.names[0].name}
          feedback={feedback}
        />
      )}

      <AnswerInput
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={handleAnswerSubmit}
        disabled={!!feedback}
        feedback={feedback}
      />
    </main>
  );
}

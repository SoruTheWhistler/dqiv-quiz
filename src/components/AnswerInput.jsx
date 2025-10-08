import React, { useRef, useEffect } from "react";
import "./AnswerInput.css";

export default function AnswerInput({ answer, setAnswer, onSubmit, disabled, feedback }) {
  const inputRef = useRef(null);

  // Focus automatique à chaque rendu
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]); // focus quand le champ est réactivé

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer);
  };

  return (
    <form className={"answer-form" + (!!feedback ? " transparent" : "")} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={answer}
        maxlength="25"
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
        placeholder="Entrez le nom du monstre..."
        autoComplete="off"
      />
      <button type="submit" disabled={disabled}>
        Envoyer
      </button>
    </form>
  );
}

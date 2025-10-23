import React from 'react';
import './Button.scss';
import he from 'he';

function Button({ text, onClick, isSelected, isDisabled, isCorrect, isGameDone }) {

  return (
    <button
      onClick={onClick}
      className={`answer-button ${isSelected ? 'answer-button--selected' : ''}
      ${isSelected && isGameDone ? (isCorrect ? "correct" : "incorrect") : null}
      ${isGameDone && !isSelected ? "blurred" : null}`}
      disabled={isDisabled}
    >
      {he.decode(text)}
    </button>
  );
}

export default Button;


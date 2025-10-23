import React, { useState } from "react";
import "./QuestionContainer.scss";
import Button from "../Button/Button";
import he from "he";
function QuestionContainer({
  question,
  answers,
  setUserGuesses,
  questionIndex,
  isGameDone,
}) {
  // disable the buttons after selection to prevent multiple clicks
  const [disable, setIsDisabled] = useState(false);
  // state to store to track the selected button
  const [selectedIndex, setSelectedIndex] = useState(null);
 

  // pass in the index from the clicked button
  const checkUserAnswer = (e, index) => {
    if (disable) return; // prevent multiple clicks
    
    // set the state to track the button index that was selected
    setSelectedIndex(index);
    setIsDisabled(true); // disable all buttons after selection

    const isCorrect = answers[index].isCorrect;

    setUserGuesses((prevArray) => {
      const isQuestionAnswered = prevArray.findIndex((answer, index) => {
        return answer.questionIndex === questionIndex;
      });

      if (isQuestionAnswered >= 0) {
        return [
          ...prevArray.slice(0, isQuestionAnswered),
          {
            questionIndex: questionIndex,
            index: index,
            isCorrect: isCorrect,
            answer: answers[index].answer,
          },
          ...prevArray.slice(isQuestionAnswered + 1),
        ];
      } else {
        return [
          ...prevArray,
          {
            questionIndex: questionIndex,
            index: index,
            isCorrect: isCorrect,
            answer: answers[index].answer,
          },
        ];
      }
    });
  };

  return (
    <section className="question">
      <h2 className="question__title">{he.decode(question)}</h2>
      <div className="question__container">
        {/* <button className='question__correctAnswer' onClick={checkUserAnswer}>{he.decode(correctAnswer)}</button> */}
        {answers.map((answer, index) => {
          const isCorrect = answers[index].isCorrect;

          return (
            <Button
              key={index}
              text={answer.answer}
              onClick={(e) => checkUserAnswer(e, index)}
              isSelected={selectedIndex === index}
              isDisabled={disable}
              isCorrect={isCorrect}
              isGameDone={isGameDone}
            />
          );
        })}
      </div>
    </section>
  );
}

export default QuestionContainer;

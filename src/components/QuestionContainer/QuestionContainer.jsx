import React, { useEffect, useState } from "react";
import "./QuestionContainer.scss";
import Button from "../Button/Button";
// default import file exports one thing
import he from "he";
function QuestionContainer({
  question,
  answers,
  setUserGuesses,
  questionIndex,
  userGuesses,
  correctGuesses,
  isGameDone,
}) {
  // disable the buttons at the correct time to
  const [disable, setIsDisabled] = useState(false);
  // state to store to track the selected button
  const [selectedIndex, setSelectedIndex] = useState(null);
 

  // pass in the index from the clicked button
  const checkUserAnswer = (e, index) => {
    // set the state to track the button index that was selected
    setSelectedIndex(index);
   

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
          // e passed to the arrow function to be passed to the checkuseranswer
          // e passed to from the arrow function cause its the function that actually
          // runs when the button is clicked.
          const isCorrect = answers[index].isCorrect;
      

          return (
            <>
             
                <Button
                  text={answer.answer}
                  onClick={(e) => checkUserAnswer(e, index)}
                  isSelected={selectedIndex === index}
                  isDisabled={disable}
                  isCorrect={isCorrect}
                  isGameDone={isGameDone}
                  key={index}
                />
              
            </>
          );
        })}
      </div>
    </section>
  );
}

export default QuestionContainer;

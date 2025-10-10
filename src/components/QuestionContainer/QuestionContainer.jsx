import React, { useState } from "react";
import "./QuestionContainer.scss";
// default import file exports one thing
import he from "he";
function QuestionContainer({ question, answers, setUserGuesses }) {

  // disable the buttons at the correct time, to be done...
  const [disable, setIsDisabled] = useState(false);
  // state to store to track the selected button
  const [selectedIndex, setSelectedIndex] = useState(null);

  // pass in the index from the clicked button
  const checkUserAnswer = (e, index) => {
 
    // set the state to track the button index that was selected
    setSelectedIndex(index);

    const isCorrect = answers[index].isCorrect;
    if (isCorrect) {
      setUserGuesses((prevArray) => [...prevArray, "correct"]);
    } else {
      setUserGuesses((prevArray) => [...prevArray, "incorrect"]);
    }
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
          return (
            <button
              onClick={(e) => checkUserAnswer(e, index)}
              // check if the index is the selected button index
              className={`question__answer ${
                selectedIndex === index ? "question__selected" : null
              } `}
              
            >
              {he.decode(answer.answer)}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuestionContainer;

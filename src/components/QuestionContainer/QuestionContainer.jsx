import React from 'react'
import "./QuestionContainer.scss"
// default import file exports one thing
import he from "he"
function QuestionContainer({question, incorrectAnswers, correctAnswer, setUserGuesses}) {
  console.log(correctAnswer)

  const checkUserAnswer = (e) => {
    const userAnswer = e.target.textContent
    if(userAnswer === correctAnswer){
      console.log("Correct!", correctAnswer)
      setUserGuesses((prevArray => [...prevArray, "correct"]))
    } else {
      console.log("incorrect")
      setUserGuesses((prevArray => [...prevArray, "incorrect"]))
    }
  }


  return (
    <section className="question">
      <h2 className="question__title">{he.decode(question)}</h2>
      <div className="question__container">
      <button className='question__correctAnswer' onClick={checkUserAnswer}>{he.decode(correctAnswer)}</button>
      {incorrectAnswers.map((answer)=>{
        return <button onClick={checkUserAnswer} className="question__incorrectAnswer">
          {he.decode(answer)}
        </button>
      })}
      </div>
    </section>
  )
}

export default QuestionContainer
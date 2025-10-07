import React, { useEffect, useState } from 'react';
import "./Home.scss";
import HomeHeader from '../../components/HomeHeader/HomeHeader';

import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import {he} from "he"

function Home() {

  const [error,setError] = useState(null)
  const [quizData,setQuizData] = useState(null)
  const [isGameStarted, setGameStarted] = useState(false)
  const [userGuesses, setUserGuesses] = useState([])
  const [isGameDone, setIsGameDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGameStart = ()=>{
    console.log("clicked")
    setGameStarted(!isGameStarted)
  }

useEffect(()=>{
  const handleQuizData = async()=>{

    setIsLoading(true)

    try{
      const quizData = await getQuizdata()
      setQuizData(quizData)
      console.log(quizData)
    }catch(error){
      console.log(error)
      setError(error)
      setIsLoading(false)
    }finally{
      setIsLoading(false)
    }
  }

  if(isGameStarted){
    handleQuizData()
  }
  
},[isGameStarted])



const correctGuesses = userGuesses.filter((guess)=> guess === "correct");
const incorrectGuesses = userGuesses.filter((guess)=> guess === "incorrect");

const score = `${correctGuesses.length}/${userGuesses.length}`
const scorePercentage = `${correctGuesses.length / userGuesses.length * 100}`

useEffect(()=>{
  console.log(userGuesses)
  console.log(correctGuesses)
  console.log(incorrectGuesses)
  console.log(scorePercentage)
},[userGuesses])


const checkScore = ()=>{
  console.log("clicked")
  if(userGuesses.length === 5){
    setIsGameDone(true)
  }
}




  return (
    <>
   {!isGameStarted ?  <HomeHeader startGame={handleGameStart} isGameStarted={isGameStarted}/> : null}

   <section className="questions__container">

    {isLoading &&<h3 className='questions__loading'>Loading...</h3>}

   {quizData && isGameStarted ? quizData.map((data,index)=>{
    console.log(data)
    return(
    <QuestionContainer 
    key={index}
    setUserGuesses={setUserGuesses}
    question={data.question}
    incorrectAnswers={data.incorrect_answers}
    correctAnswer={data.correct_answer}
    />
    )
}) : null}
  </section>
  {isGameStarted && <button onClick={checkScore} className='checkAnswers'>checkAnswers</button>}
  {isGameDone && <p className='userScore'>{`You scored ${score} correct answers or ${scorePercentage}%`}</p>}
  </>
  )
}

export default Home
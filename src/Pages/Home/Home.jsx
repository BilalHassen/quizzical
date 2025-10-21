import React, { useEffect, useState } from "react";
import "./Home.scss";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import getQuizdata from "../../hooks/getQuizData";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import { he } from "he";
import { shuffleArray } from "../../utils/shuffleArray";

function Home() {
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isGameStarted, setGameStarted] = useState(false);
  // track the user guesses for correct or incorrect guesses
  const [userGuesses, setUserGuesses] = useState([]);
  const [isGameDone, setIsGameDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // start the game
  const handleGameStart = () => {
   
    setGameStarted(!isGameStarted);
  };

  // get the quiz data
  useEffect(() => {
    const handleQuizData = async () => {
      setIsLoading(true);

      try {
        const quizData = await getQuizdata();
        const shuffledQuizData = shuffleArray(quizData)
        console.log(shuffledQuizData)
        setQuizData(shuffledQuizData);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isGameStarted) {
      handleQuizData();
    }
  }, [isGameStarted]);

  const correctGuesses = userGuesses.filter((guess) => guess.isCorrect);

  const score = `${correctGuesses.length}/${userGuesses.length}`;
  const scorePercentage = `${
    (correctGuesses.length / userGuesses.length) * 100
  }`;

  const checkUserGuesses = () => {
    console.log("clicked");
    if (userGuesses.length === 5) {
      setIsGameDone(true);
    }
  };

  return (
    <>
      {!isGameStarted ? (
        <HomeHeader startGame={handleGameStart} isGameStarted={isGameStarted} />
      ) : null}

      <section className="questions__container">
        {isLoading && <h3 className="questions__loading">Loading...</h3>}

        {quizData && isGameStarted
          ? quizData.map((data, index) => {
          

              return (
                <QuestionContainer
                  questionIndex={index}
                  userGuesses={userGuesses}
                  setUserGuesses={setUserGuesses}
                  question={data.question}
                  answers={data.answers}
                  correctGuesses={correctGuesses}
                  isGameDone={isGameDone}
                />
              );
            })
          : null}
      </section>
      {isGameStarted && (
        <button onClick={checkUserGuesses} className="checkAnswers">
          Check Answers
        </button>
      )}
      {isGameDone && (
        <p className="userScore">{`You scored ${score} correct answers or ${scorePercentage}%`}</p>
      )}
    </>
  );
}

export default Home;

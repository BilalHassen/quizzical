import React, { useEffect, useState } from "react";
import "./Home.scss";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import getQuizdata from "../../hooks/getQuizData";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
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
        const shuffledQuizData = shuffleArray(quizData);
        setQuizData(shuffledQuizData);
      } catch (error) {
        setError(error.message);
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
  const scorePercentage = userGuesses.length > 0 
    ? `${Math.round((correctGuesses.length / userGuesses.length) * 100)}%`
    : "0%";

  const checkUserGuesses = () => {
    if (userGuesses.length === 5) {
      setIsGameDone(true);
    } else {
      alert(`Please answer all questions. You've answered ${userGuesses.length}/5 questions.`);
    }
  };

  const handleRestart = () => {
    setQuizData(null);
    setUserGuesses([]);
    setIsGameDone(false);
    setIsLoading(false);
    setError(null);
    setGameStarted(false);
  };
  

  return (
    <>
      {!isGameStarted ? (
        <HomeHeader startGame={handleGameStart} isGameStarted={isGameStarted} />
      ) : null}

      <section className="questions">
        {isLoading && <h3 className="questions__loading">Loading...</h3>}
        {error && (
          <div className="questions__error">
            <p>{error}</p>
            <button onClick={handleRestart} className="questions__retry-btn">
              Try Again
            </button>
          </div>
        )}

        {quizData && isGameStarted && !isLoading
          ? quizData.map((data, index) => {
              return (
                <QuestionContainer
                  key={index}
                  questionIndex={index}
                  setUserGuesses={setUserGuesses}
                  question={data.question}
                  answers={data.answers}
                  isGameDone={isGameDone}
                />
              );
            })
          : null}

        <div
          className={`questions__controls ${
            isGameDone ? "questions__controls-reversed" : ""
          }`}
        >
          {isGameStarted && !isGameDone ? (
            <button onClick={checkUserGuesses} className="checkAnswers">
              Check Answers
            </button>
          ) : isGameStarted ? (
            <button onClick={handleRestart} className="checkAnswers">
              Play Again
            </button>
          ): null}
          {isGameDone && (
            <p className="questions__userScore">{`You scored ${score} correct answers or ${scorePercentage}`}</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;

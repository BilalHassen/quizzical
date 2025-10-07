import React from 'react'
import "./HomeHeader.scss";
function HomeHeader({startGame, isGameStarted}) {
  return (
    <main className='home'>
    <header className='home__header'>
    <h1 className='home__title'>Quizzical</h1>
    <p className='home__subheading'>Test your knowledge with our interactive quiz!</p>
    <button onClick={startGame} className="home__start-btn">
        Start Quiz
    </button>
    </header>
</main>
  )
}

export default HomeHeader
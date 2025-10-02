import React from 'react';
import Header from './components/Header';
import Button from './components/Button';

function App() {
  return (
    <div className="app">
      <Header 
        title="Quizzical" 
        subtitle="Test your knowledge with our quiz app" 
      />
      <div className="app__content">
        <Button variant="primary" onClick={() => console.log('Start Quiz!')}>
          Start Quiz
        </Button>
        <Button variant="secondary" onClick={() => console.log('View Results')}>
          View Results
        </Button>
      </div>
    </div>
  )
}

export default App

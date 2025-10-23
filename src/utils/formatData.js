const formatData = (data) => {
    const formattedData = data.map((item, qIndex) => {
      // map incorrect answers with stable unique IDs
      const incorrectAnswers = item.incorrect_answers.map((inAnswer, aIndex) => ({
        isCorrect: false,
        answer: inAnswer,
        id: `${qIndex}-i-${aIndex}`, 
      }));
  
     
      const correctAnswer = {
        isCorrect: true,
        answer: item.correct_answer,
        id: `${qIndex}-c-0`, 
      };
  
      return {
        question: item.question,
        answers: [...incorrectAnswers, correctAnswer],
      };
    });
  
    return formattedData; 
  };
  
  export default formatData;
  
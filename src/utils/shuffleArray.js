export function shuffleArray(array) {
  const newArray = [...array];

  return newArray.map((questions) => {
    const answersList = [...questions.answers];

    for (let i = answersList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answersList[i], answersList[j]] = [answersList[j], answersList[i]];
    }

    const shuffledAnswersList = { ...questions, answers: answersList };

    return shuffledAnswersList;
  });
}

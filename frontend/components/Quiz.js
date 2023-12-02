import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelect = (answer) => {
    selectAnswer(answer);
  };

  const renderAnswers = () => {
    return quiz.answers.map((answer, index) => (
      <div
        key={index}
        className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
        onClick={() => handleAnswerSelect(answer)}
      >
        {answer.text}
        <button>
          {selectedAnswer === answer ? 'SELECTED' : 'Select'}
        </button>
      </div>
    ));
  };

  const handleSubmitAnswer = () => {
    if (props.selectedAnswer !== null) {
      const answerPayload = {
        quiz_id: quiz.id,
        answer_id: props.selectedAnswer.id,
      };
      props.postAnswer(answerPayload);
    }
    fetchQuiz();
  };

  if (quiz === null) {
    return <div>Loading next quiz...</div>;
  }

  return (
    <div id="wrapper">

      <h2>{quiz.question}</h2>

      <div id="quizAnswers">{renderAnswers()}</div>

      <button
        id="submitAnswerBtn"
        disabled={props.selectedAnswer === null}
        onClick={handleSubmitAnswer}
      >
        Submit answer
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  };
};

export default connect(mapStateToProps, actionCreators)(Quiz);
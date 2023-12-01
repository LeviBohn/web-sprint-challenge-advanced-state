import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  if (quiz === null) {
    return <div>Loading next quiz...</div>;
  }

  return (
    <div id="wrapper">

      <h2>{quiz.question}</h2>

      <div id="quizAnswers">
        <div className="answer selected">
          {quiz.answers[0].text}
          <button>
            SELECTED
          </button>
        </div>

        <div className="answer">
          {quiz.answers[1].text}
          <button>
            Select
          </button>
        </div>
      </div>


      <button id="submitAnswerBtn" disabled={props.selectedAnswer === null}>Submit answer</button>
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
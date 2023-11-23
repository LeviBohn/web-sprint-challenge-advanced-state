import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const { quiz, selectedAnswer, postAnswer, fetchQuiz } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelection = (answer) => {
    props.selectAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    postAnswer();
    fetchQuiz();
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer, index) => (
                <div
                  className={`answer ${answer === selectedAnswer ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleAnswerSelection(answer)}
                >
                  {answer.text}
                  <button>
                    {answer === selectedAnswer ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}

              {/* <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div> */}
            </div>

            <button
              id="submitAnswerBtn"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
            >
              Submit answer
            </button>
          </>
        ) : (
          'Loading next quiz...'
        )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectAnswer
  };
};

export default connect(mapStateToProps, actionCreators)(Quiz);
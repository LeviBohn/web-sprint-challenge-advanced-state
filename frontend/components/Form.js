import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const {
    newQuestion,
    newTrueAnswer,
    newFalseAnswer,
    inputChange,
    postQuiz,
    infoMessage,
    resetForm,
    addQuiz
  } = props;

  const onChange = (id, value) => {
    inputChange(id, value);
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    // console.log("when submit button is pressed:", newQuizPayload);
    if (areInputsValid()) {
      const newQuizPayload = {
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer
      };
    

    props.postQuiz(newQuizPayload)
      .then(() => {
        props.resetForm();
        props.setMessage(`Congrats: "${newQuestion}" is a great question!`);
      })
      .catch((error) => {
        console.error('Error submitting new quiz:', error);
        props.setMessage('Error submitting new quiz.');
      });
    }
  }


const areInputsValid = () => {
  return (
    newQuestion.trim().length > 1 &&
    newTrueAnswer.trim().length > 1 &&
    newFalseAnswer.trim().length > 1
  )
};

return (
  <form id="form" onSubmit={onSubmit}>
    <h2>Create New Quiz</h2>
    <input
      maxLength={50}
      onChange={(e) => onChange('newQuestion', e.target.value)}
      id="newQuestion"
      placeholder="Enter question"
      value={newQuestion}
    />
    <input
      maxLength={50}
      onChange={(e) => onChange('newTrueAnswer', e.target.value)}
      id="newTrueAnswer"
      placeholder="Enter true answer"
      value={newTrueAnswer}
    />
    <input
      maxLength={50}
      onChange={(e) => onChange('newFalseAnswer', e.target.value)}
      id="newFalseAnswer"
      placeholder="Enter false answer"
      value={newFalseAnswer}
    />
    <button
      id="submitNewQuizBtn"
      disabled={!areInputsValid()}
      onClick={onSubmit}>
      Submit new quiz
    </button>
    {infoMessage && <div id="message">{infoMessage}</div>}
  </form>
)
};


export default connect((state) => state.form, actionCreators)(Form)
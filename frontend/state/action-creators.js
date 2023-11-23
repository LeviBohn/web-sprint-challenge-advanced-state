import * as types from "./action-types";

import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
};

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
};

export function selectAnswer(answer) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer };
 }

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message };
 }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({ type: types.SET_INFO_MESSAGE });
    axios
      .get('http://localhost:9000/api/quiz/next')
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
      .then((response) => {
        const { quiz, answerStatus } = response.data;
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: quiz });
        if (answerStatus === 'correct') {
          dispatch(setMessage('Nice job! That was the correct answer'));
        } else if (answerStatus === 'incorrect') {
          dispatch(setMessage('What a shame! That was the incorrect answer'));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function postAnswer() {
  return function (dispatch, getState) {
    const { selectedAnswer, quiz } = getState();
    if (selectedAnswer !== null) {
      const payload = {
        quiz_id: quiz.id,
        answer_id: selectedAnswer.id
      };

      dispatch(selectedAnswer(null));

      axios
        .post('http://localhost:9000/api/quiz/answer', payload)
        .then((response) => {
          if (response.data.correct) {
            dispatch(setMessage('Nice job! That was the correct answer'));
          } else {
            console.error(error);
          }
          
          dispatch(fetchQuiz());
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('No answer selected');
    }
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}

export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

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

export function setMessage() { }

export function setQuiz() { }

export function inputChange(id, value) {
  return { type: types.INPUT_CHANGE, payload: { id, value } };
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
      .then(response => {
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: response.data });
      })
      .catch(error => {
        console.error(error);
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(response => {
        dispatch({type: types.SET_SELECTED_ANSWER, payload: null });
        dispatch({ type: types.SET_INFO_MESSAGE, payload: response.data.message });
        dispatch(fetchQuiz());
      })
      .catch(error => {
        console.error('Error submitting answer:', error);
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}

export function postQuiz() {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', payload)
    .then(response => {
      dispatch(setInfoMessage(response.data.message));
      dispatch(resetForm());
    })
    .catch(error => {
      console.error('Error submitting new quiz:', error);
      dispatch(setInfoMessage('Error submitting new quiz.'));
    });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
